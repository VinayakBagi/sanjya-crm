import * as fs from "fs";
import * as csvParser from "csv-parser";
import * as ExcelJS from "exceljs";
import { mapRecordFields } from "./mapping";

// Helper to parse Excel or CSV file using stream
const parseFileWithStream = async (
  filePath: string,
  fileExtension: string
): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
    try {
      if (fileExtension === "csv") {
        // Stream CSV
        const fileStream = fs.createReadStream(filePath);
        const csvData: any[] = [];

        fileStream
          .pipe(csvParser.default()) // Stream the CSV data
          .on("data", (chunk) => {
            // Process each CSV row
            csvData.push(chunk);
          })
          .on("end", () => {
            resolve(csvData);
          })
          .on("error", (error) => {
            reject(error);
          });

        return;
      } else if (fileExtension === "xlsx") {
        const options: Partial<ExcelJS.stream.xlsx.WorkbookStreamReaderOptions> =
          {
            sharedStrings: "cache",
            hyperlinks: "cache",
            worksheets: "emit",
            styles: "cache",
          };

        const workbookReader: any = new ExcelJS.stream.xlsx.WorkbookReader(
          filePath,
          options
        );

        const xlsxData: any[] = [];
        let headers: string[] = [];

        // Start reading the workbook
        workbookReader.read();

        workbookReader.on("worksheet", (worksheet) => {
          console.log(`Processing worksheet: ${worksheet.name}`);

          worksheet.on("row", (row) => {
            if (row.number === 1) {
              // Extract headers from the first row
              headers = row.values.map(
                (val, index) =>
                  row.getCell(index).value?.toString().trim() || ""
              );
            } else {
              // Process data rows
              const rowData: any = {};
              headers.forEach((header, colIndex) => {
                const cellValue = row.getCell(colIndex).value;
                rowData[header] = cellValue ? cellValue?.toString() : null;
              });
              xlsxData.push(rowData);
            }
          });

          worksheet.on("end", () => {
            console.log(`Finished processing worksheet: ${worksheet.name}`);
          });
        });

        workbookReader.on("end", () => {
          resolve(xlsxData);
        });

        workbookReader.on("error", (err) => {
          console.error("Error:", err);
          reject(err);
        });

        return;
      }

      // If the file extension is not supported
      reject(new Error("Unsupported file format."));
    } catch (error) {
      reject(error);
    }
  });
};

// Custom chunk function
const chunk = (array: any[], size: number): any[][] => {
  const result: any[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const validateRecord = async (
  record: any,
  modelName: string,
  type?: string
): Promise<{ valid: boolean; missingFields: string[] }> => {
  const missingFields: string[] = [];

  switch (modelName) {
    case "fg-control-main":
      if (!record.operand) missingFields.push("operand");
      if (!record.flex_group_id) missingFields.push("flex_group_id");
      break;

    case "fg-customer-business":
      if (!record.operand) missingFields.push("operand");
      if (!record.flex_group_id) missingFields.push("flex_group_id");
      if (!record.membership_id && !record.bp_id)
        missingFields.push("membership_id or bp_id");
      break;

    case "fg-product-business":
      if (!record.operand) missingFields.push("operand");
      if (!record.flex_group_id) missingFields.push("flex_group_id");
      if (!record.product_id && !record.vendor_id && !record.product_hierarchy)
        missingFields.push("product_id, vendor_id, or product_hierarchy");
      break;

    case "fg-relationship":
      if (!record.operand) missingFields.push("operand");
      if (!record.flex_group_id) missingFields.push("flex_group_id");
      if (!record.child_id) missingFields.push("child_id");
      break;

    case "product":
      if (!record.product_id) missingFields.push("product_id or code");
      break;

    case "product-media":
      if (!record.product_id) missingFields.push("product_id");
      if (!record.url) missingFields.push("url");
      if (!record.media_type) missingFields.push("media_type");
      break;

    case "product-suggestion":
      if (!record.product_suggestion_type_id)
        missingFields.push("product_suggestion_type_id");
      if (!record.product_id) missingFields.push("product_id");
      if (!record.product_suggested_id)
        missingFields.push("product_suggested_id");
      break;

    case "crm-activity":
      if (!record.External_Key) missingFields.push("External_Key");
      break;

    case "contact":
      if (!record.Account_ID) missingFields.push("Account_ID");
      else {
        try {
          const account = await strapi
            .query("api::business-partner.business-partner")
            .findOne({
              where: { bp_id: record.Account_ID },
            });
          if (!account) {
            missingFields.push("Account_ID");
          }
        } catch (error) {
          console.error("Error finding account:", error);
        }
      }
      break;

    case "business-partner":
      const fieldToCheck = type === "account" ? "Account_ID" : "Prospect_ID";
      if (!record[fieldToCheck]) missingFields.push(fieldToCheck);
      break;

    default:
      return Promise.resolve({
        valid: false,
        missingFields: ["Invalid model name"],
      });
  }

  return Promise.resolve({ valid: missingFields.length === 0, missingFields });
};

const createFileState = async (data: any) => {
  return await strapi
    .query("api::import-file-state.import-file-state")
    .create({ data });
};

const updateFileState = async (id: any, { file_status, message }: any) => {
  const success_count = await strapi
    .query("api::import-file-log.import-file-log")
    .count({
      where: { import_file_id: id, log_status: "SUCCESS" },
    });

  const failed_count = await strapi
    .query("api::import-file-log.import-file-log")
    .count({
      where: { import_file_id: id, log_status: "FAILED" },
    });

  return await strapi.query("api::import-file-state.import-file-state").update({
    where: { id },
    data: {
      success_count,
      failed_count,
      completed_count: success_count + failed_count,
      file_status,
      message,
    },
  });
};

const checkFlexgroupOperand = (record: any, data?: any) => {
  if (data && record.operand === "ADD") {
    throw new Error(
      "Record already exists. Please change the operand from ADD to UPDATE."
    );
  } else if (
    !data &&
    (record.operand === "UPDATE" || record.operand === "DELETE")
  ) {
    throw new Error(
      `Record not exists. Please change the operand from ${record.operand} to ADD.`
    );
  }
};

// Find existing record in the table based on primary keys or unique fields
const findExistingRecord = async (
  record: any,
  modelName: string,
  type?: string
) => {
  let data: any = null;
  try {
    switch (modelName) {
      case "fg-control-main":
        data = await strapi
          .query(`api::${modelName}.${modelName}` as any)
          .findOne({
            where: {
              flex_group_id: record.flex_group_id,
              flex_group_type: record.flex_group_type,
              indicator_type: record.indicator_type,
              description: record.description,
              valid_from: record.valid_from,
              valid_to: record.valid_to,
            },
          });
        checkFlexgroupOperand(record, data);
        break;
      case "fg-customer-business":
        data = await strapi
          .query(`api::${modelName}.${modelName}` as any)
          .findOne({
            where: {
              flex_group_id: record.flex_group_id,
              membership_id: record.membership_id,
              bp_id: record.bp_id,
            },
          });
        checkFlexgroupOperand(record, data);
        break;
      case "fg-product-business":
        data = await strapi
          .query(`api::${modelName}.${modelName}` as any)
          .findOne({
            where: {
              flex_group_id: record.flex_group_id,
              product_id: record.product_id,
              vendor_id: record.vendor_id,
              product_hierarchy: record.product_hierarchy,
            },
          });
        checkFlexgroupOperand(record, data);
        break;
      case "fg-relationship":
        data = await strapi
          .query(`api::${modelName}.${modelName}` as any)
          .findOne({
            where: {
              flex_group_id: record.flex_group_id,
              child_id: record.child_id,
            },
          });
        checkFlexgroupOperand(record, data);
        break;
      case "product":
        data = await strapi
          .query(`api::${modelName}.${modelName}` as any)
          .findOne({
            where: {
              product_id: record.product_id,
            },
          });
        break;
      case "product-media":
        data = await strapi
          .query(`api::${modelName}.${modelName}` as any)
          .findOne({
            where: {
              product_id: record.product_id,
              url: record.url,
              media_type: record.media_type,
            },
          });
        break;
      case "product-suggestion":
        data = await strapi
          .query(`api::${modelName}.${modelName}` as any)
          .findOne({
            where: {
              product_id: record.product_id,
              product_suggestion_type_id: record.product_suggestion_type_id,
              product_suggested_id: record.product_suggested_id,
            },
          });
        break;
      case "crm-activity":
        data = await strapi.query(`api::${modelName}.${modelName}`).findOne({
          where: {
            activity_id: record.External_Key,
          },
        });
        break;
      case "contact":
        data = await strapi
          .query(`api::business-partner.business-partner`)
          .findOne({
            where: {
              bp_id: record.Contact_ID,
            },
          });
        break;
      case "business-partner":
        data = await strapi
          .query(`api::business-partner.business-partner`)
          .findOne({
            where: {
              bp_id:
                type === "account" ? record.Account_ID : record.Prospect_ID,
              // roles: {
              //   bp_role: record.Role,
              // },
            },
            // populate: {
            //   roles: true,
            // },
          });
        break;
      default:
        return data;
    }
    return data;
  } catch (error) {
    console.error("Error finding existing record:", error);
    throw error;
  }
};

// Update existing record
const updateRecord = async (id: string, record: any, modelName: string) => {
  await strapi.documents(`api::${modelName}.${modelName}` as any).update({
    documentId: id,
    data: record,
  });
};

// Create new record
const createNewRecord = async (record: any, modelName: string) => {
  await strapi.documents(`api::${modelName}.${modelName}` as any).create({
    data: { ...record },
  });
};

// Update existing record
const updateActivityRecord = async (
  id: string,
  record: any,
  modelName: string
) => {
  try {
    const mappedRecord = mapRecordFields(record, modelName);
    const notes = mappedRecord.notes;
    delete mappedRecord.notes;
    mappedRecord.locale = "en";
    const res = await strapi
      .query(`api::${modelName}.${modelName}` as any)
      .update({
        where: {
          documentId: id,
        },
        data: mappedRecord,
      });
    if (notes && notes.trim() !== "" && res.activity_id) {
      await strapi.query("api::crm-note.crm-note").create({
        data: {
          activity_id: res.activity_id,
          note: notes,
          locale: "en",
        },
      });
    }
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
};

// Create new activity record
const createActivityNewRecord = async (record: any, modelName: string) => {
  try {
    const mappedRecord = mapRecordFields(record, modelName);
    const notes = mappedRecord.notes;
    delete mappedRecord.notes;
    mappedRecord.locale = "en";
    const res = await strapi
      .query(`api::${modelName}.${modelName}` as any)
      .create({
        data: mappedRecord,
      });
    if (notes && notes.trim() !== "" && res.activity_id) {
      await strapi.query("api::crm-note.crm-note").create({
        data: {
          activity_id: res.activity_id,
          note: notes,
          locale: "en",
        },
      });
    }
  } catch (error) {
    console.error("Error creating new record:", error);
    throw error;
  }
};

const createLog = async (data: any) => {
  await strapi.query("api::import-file-log.import-file-log").create({ data });
};

export {
  parseFileWithStream,
  chunk,
  validateRecord,
  createFileState,
  updateFileState,
  findExistingRecord,
  createNewRecord,
  updateRecord,
  createLog,
  updateActivityRecord,
  createActivityNewRecord,
};
