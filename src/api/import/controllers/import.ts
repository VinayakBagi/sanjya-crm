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
  createContactNewRecord,
  updateContactRecord,
} from "../helpers/contact";

// Efficiently process and import data in chunks
const processInChunks = async (
  data: any[],
  importState: any,
  tableName: string
) => {
  const batchSize = 500;
  // Split data into chunks for batch processing
  const chunkedData = chunk(data, batchSize);

  for (let i = 0; i < chunkedData.length; i++) {
    const batch = chunkedData[i];
    await processBatch(batch, importState, tableName);
  }
};

// Process a batch of data
const processBatch = async (
  batch: any[],
  importState: any,
  tableName: string
) => {
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
            record.product_id = record.code;
            delete record.code;
          }
        }
      }

      // Validate record and skip if invalid
      const { valid, missingFields } = await validateRecord(record, modelName);

      if (!valid) {
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

      const existingRecord = await findExistingRecord(record, modelName);

      switch (modelName) {
        case "crm-activity":
          if (existingRecord) {
            await updateActivityRecord(
              existingRecord.documentId,
              record,
              modelName
            );
          } else {
            await createActivityNewRecord(record, modelName);
          }
          break;
        case "contact":
          if (existingRecord) {
            await updateContactRecord(
              existingRecord.documentId,
              record,
              modelName
            );
          } else {
            await createContactNewRecord(record, modelName);
          }
          break;
        default:
          if (existingRecord) {
            await updateRecord(existingRecord.documentId, record, modelName);
          } else {
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

  await updateFileState(importState.id, fileState);
};

// Main function to handle file import
const importData = async (ctx: any, tableName: string) => {
  let importState = null;

  try {
    const { file } = ctx.request.files || {};
    if (!file) {
      return ctx.badRequest("File is required.");
    }

    const { filepath, originalFilename, size, mimetype } = file;

    const maxFileSize = 1 * 1024 * 1024; // 1 MB
    if (size > maxFileSize) {
      return ctx.badRequest(
        `File size exceeds the limit of ${maxFileSize / (1024 * 1024)} MB.`
      );
    }

    // Parse the file based on extension
    const fileExtension = originalFilename.split(".").pop()?.toLowerCase();
    if (!["csv", "xlsx"].includes(fileExtension || "")) {
      return ctx.badRequest("Unsupported file format.");
    }

    const parsedData = await parseFileWithStream(filepath, fileExtension);

    const newFileState = {
      file_name: originalFilename,
      file_type: mimetype,
      file_size: size,
      table_name: tableName,
      total_count: parsedData.length,
    };
    // Create a new import file state
    importState = await createFileState(newFileState);

    // Process the data in chunks
    await processInChunks(parsedData, importState, tableName);

    const fileState = {
      file_status: "DONE",
      message: "Import completed successfully.",
    };

    // Final update to import file state
    importState = await updateFileState(importState.id, fileState);

    ctx.send({
      data: importState,
    });
  } catch (error) {
    console.log(error);
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
};
