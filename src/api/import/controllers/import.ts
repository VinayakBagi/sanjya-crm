import {
  chunk,
  createActivityNewRecord,
  createFileState,
  createLog,
  createNewRecord,
  findExistingRecord,
  parseFileWithStream,
  updateActivityRecord,
  updateFileState,
  updateRecord,
  validateRecord,
} from "../helpers";
import {
  createBusinessPartnerNewRecord,
  updateBusinessPartnerRecord,
} from "../helpers/businessPartner";
import {
  createContactNewRecord,
  updateContactRecord,
} from "../helpers/contact";

const prospectRole = "PRO001";

// Efficiently process and import data in chunks
const processInChunks = async (
  data: any[],
  importState: any,
  tableName: string,
  type?: string
) => {
  console.log(
    `[processInChunks] Starting chunked processing for table: ${tableName}, total records: ${data.length}`
  );
  const batchSize = 500;
  // Split data into chunks for batch processing
  const chunkedData = chunk(data, batchSize);

  for (let i = 0; i < chunkedData.length; i++) {
    console.log(
      `[processInChunks] Processing batch ${i + 1}/${chunkedData.length}, batch size: ${chunkedData[i].length}`
    );
    const batch = chunkedData[i];
    await processBatch(batch, importState, tableName, type);
  }
  console.log(
    `[processInChunks] Finished processing all batches for table: ${tableName}`
  );
};

// Process a batch of data
const processBatch = async (
  batch: any[],
  importState: any,
  tableName: string,
  type?: string
) => {
  console.log(
    `[processBatch] Processing batch for table: ${tableName}, batch size: ${batch.length}`
  );
  const batchSize = batch.length;
  const modelName = tableName.replace(/_/g, "-").toLocaleLowerCase();

  for (let i = 0; i < batchSize; i++) {
    const record = batch[i];
    try {
      // Modify record for product
      if (modelName === "product") {
        if (!record.product_id) {
          if (
            record.code &&
            typeof record.code === "string" &&
            record.code.trim() !== ""
          ) {
            console.log(
              `[processBatch] Setting product_id from code for record at index ${i}`
            );
            record.product_id = record.code;
            delete record.code;
          }
        }
      }

      // Validate record and skip if invalid
      const { valid, missingFields } = await validateRecord(
        record,
        modelName,
        type
      );

      if (!valid) {
        console.log(
          `[processBatch] Record at index ${i} failed validation. Missing fields: ${missingFields.join(", ")}`
        );
        const log = {
          import_file_id: importState.id,
          row_number: i + 1,
          log_status: "FAILED",
          message: `Record validation failed. Missing fields: ${missingFields.join(", ")}. Skipped import.`,
          data: record,
        };
        await createLog(log);
        continue;
      }

      const existingRecord = await findExistingRecord(record, modelName, type);
      console.log(
        `[processBatch] Record at index ${i} ${existingRecord ? "exists" : "does not exist"} in model: ${modelName}`
      );

      switch (modelName) {
        case "crm-activity":
          if (existingRecord) {
            console.log(
              `[processBatch] Updating CRM activity record at index ${i}`
            );
            await updateActivityRecord(
              existingRecord.documentId,
              record,
              modelName
            );
          } else {
            console.log(
              `[processBatch] Creating new CRM activity record at index ${i}`
            );
            await createActivityNewRecord(record, modelName);
          }
          break;
        case "contact":
          if (existingRecord) {
            console.log(`[processBatch] Updating contact record at index ${i}`);
            await updateContactRecord(
              existingRecord.documentId,
              record,
              modelName
            );
          } else {
            console.log(
              `[processBatch] Creating new contact record at index ${i}`
            );
            await createContactNewRecord(record, modelName);
          }
          break;
        case "business-partner":
          if (existingRecord) {
            console.log(
              `[processBatch] Updating business partner record at index ${i}`
            );
            await updateBusinessPartnerRecord(
              existingRecord.documentId,
              record,
              modelName,
              type
            );
          } else {
            console.log(
              `[processBatch] Creating new business partner record at index ${i}`
            );
            if (record.Role === prospectRole) {
              await createBusinessPartnerNewRecord(record, modelName, type);
            }
          }
          break;
        default:
          if (existingRecord) {
            console.log(
              `[processBatch] Updating record at index ${i} in model: ${modelName}`
            );
            await updateRecord(existingRecord.documentId, record, modelName);
          } else {
            console.log(
              `[processBatch] Creating new record at index ${i} in model: ${modelName}`
            );
            await createNewRecord(record, modelName);
          }
          break;
      }

      const log = {
        import_file_id: importState.id,
        row_number: i + 1,
        log_status: "SUCCESS",
        message: "Record processed successfully",
        data: record,
      };
      await createLog(log);
    } catch (recordError) {
      console.log(
        `[processBatch] Error processing record at index ${i}: ${recordError.message}`
      );
      const log = {
        import_file_id: importState.id,
        row_number: i + 1,
        log_status: "FAILED",
        message: recordError.message,
        data: record,
      };
      await createLog(log);
    }
  }

  const fileState = {
    file_status: "IN_PROGRESS",
    message: "Import is in progress.",
  };

  console.log(
    `[processBatch] Updating file state to IN_PROGRESS for importState.id: ${importState.id}`
  );
  await updateFileState(importState.id, fileState);
};

// Main function to handle file import
const importData = async (ctx: any, tableName: string, type?: string) => {
  console.log(`[importData] Starting import for table: ${tableName}`);
  let importState = null;

  try {
    const { file } = ctx.request.files || {};
    if (!file) {
      console.log(`[importData] No file provided in request`);
      return ctx.badRequest("File is required.");
    }

    const { filepath, originalFilename, size, mimetype } = file;
    console.log(
      `[importData] Received file: ${originalFilename}, size: ${size}, mimetype: ${mimetype}`
    );

    const maxFileSize = 1 * 1024 * 1024; // 1 MB
    if (size > maxFileSize) {
      console.log(
        `[importData] File size exceeds limit: ${size} > ${maxFileSize}`
      );
      return ctx.badRequest(
        `File size exceeds the limit of ${maxFileSize / (1024 * 1024)} MB.`
      );
    }

    // Parse the file based on extension
    const fileExtension = originalFilename.split(".").pop()?.toLowerCase();
    console.log(`[importData] File extension: ${fileExtension}`);
    if (!["csv", "xlsx"].includes(fileExtension || "")) {
      console.log(`[importData] Unsupported file format: ${fileExtension}`);
      return ctx.badRequest("Unsupported file format.");
    }

    const parsedData = await parseFileWithStream(filepath, fileExtension);
    console.log(`[importData] Parsed data length: ${parsedData.length}`);

    const newFileState = {
      file_name: originalFilename,
      file_type: mimetype,
      file_size: size,
      table_name: tableName,
      total_count: parsedData.length,
    };
    // Create a new import file state
    importState = await createFileState(newFileState);
    console.log(
      `[importData] Created new file state: ${JSON.stringify(importState)}`
    );

    // Process the data in chunks
    await processInChunks(parsedData, importState, tableName, type);

    const fileState = {
      file_status: "DONE",
      message: "Import completed successfully.",
    };

    // Final update to import file state
    importState = await updateFileState(importState.id, fileState);
    console.log(
      `[importData] Import completed, final file state: ${JSON.stringify(importState)}`
    );

    ctx.send({
      data: importState,
    });
  } catch (error) {
    console.log(`[importData] Error during import: ${error.message}`);
    // If any error occurs, update import file state
    if (importState) {
      const fileState = {
        file_status: "FAILED",
        message: error.message,
      };
      await updateFileState(importState.id, fileState);
    }
    ctx.badRequest("Import failed.", { error });
  }
};

module.exports = {
  async fgControlMains(ctx) {
    await importData(ctx, "FG_CONTROL_MAIN");
  },

  async fgCustomerBusinesses(ctx) {
    await importData(ctx, "FG_CUSTOMER_BUSINESS");
  },

  async fgProductBusinesses(ctx) {
    await importData(ctx, "FG_PRODUCT_BUSINESS");
  },

  async fgRelationships(ctx) {
    await importData(ctx, "FG_RELATIONSHIP");
  },

  async product(ctx) {
    await importData(ctx, "PRODUCT");
  },

  async productMedia(ctx) {
    await importData(ctx, "PRODUCT_MEDIA");
  },

  async productSuggestion(ctx) {
    await importData(ctx, "PRODUCT_SUGGESTION");
  },

  async salesCall(ctx) {
    await importData(ctx, "CRM_ACTIVITY");
  },

  async contact(ctx) {
    await importData(ctx, "CONTACT");
  },

  async account(ctx) {
    await importData(ctx, "BUSINESS_PARTNER", "account");
  },

  async prospect(ctx) {
    await importData(ctx, "BUSINESS_PARTNER", "prospect");
  },
};
