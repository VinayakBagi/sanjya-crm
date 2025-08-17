import { mapRecordFields } from "./mapping";

// Helper function to convert string boolean values
const convertStringToBoolean = (value: any): boolean => {
  if (typeof value === "boolean") return value;
  const stringValue = (value || "").toString().toLowerCase();
  return stringValue === "true" || stringValue === "1" || stringValue === "yes";
};

// Helper function to convert dates
const convertToDate = (value: any): Date | null => {
  if (!value) return null;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
};

const createOrUpdate = async (formData: any, create = true) => {
  try {
    const {
      bp_id,
      role,
      conference_room,
      date_opened,
      fitness_center_gym,
      language,
      pool,
      purchasing_control,
      renovation_date,
      restaurant,
      seasonal_close_date,
      seasonal_open_date,
    } = formData;

    // Convert boolean fields
    const processedData: any = {
      bp_id,
      role,
      conference_room,
      date_opened,
      fitness_center_gym,
      language,
      pool,
      purchasing_control,
      renovation_date,
      restaurant,
      seasonal_close_date,
      seasonal_open_date,
    };

    // Remove empty/undefined fields to avoid overwriting existing data with empty values
    Object.keys(processedData).forEach((key) => {
      if (
        processedData[key] === "" ||
        processedData[key] === undefined ||
        processedData[key] === null
      ) {
        delete processedData[key];
      }
    });

    const result = await strapi.db.transaction(async () => {
      let businessPartner: any;

      if (create) {
        // Create new business partner
        businessPartner = await strapi
          .query("api::business-partner.business-partner")
          .create({
            data: {
              ...processedData,
              locale: "en",
            },
          });
      } else {
        // Find existing business partner by bp_id
        businessPartner = await strapi
          .query("api::business-partner.business-partner")
          .findOne({
            where: { bp_id: bp_id },
          });

        if (!businessPartner) {
          throw new Error(`Business Partner with ID '${bp_id}' not found`);
        }

        // Update existing business partner
        businessPartner = await strapi
          .query("api::business-partner.business-partner")
          .update({
            where: { id: businessPartner.id },
            data: processedData,
          });
      }

      // Handle business partner roles if provided
      if (formData.role || formData.bp_role) {
        const roleData = {
          bp_role: formData.role || formData.bp_role,
          bp_id: businessPartner.bp_id,
          locale: "en",
        };

        // Check if role already exists for this business partner
        const existingRole = await strapi
          .query("api::business-partner-role.business-partner-role")
          .findOne({
            where: {
              bp_id: businessPartner.bp_id,
              bp_role: roleData.bp_role,
            },
          });

        if (!existingRole && create) {
          // Create new role only when creating new business partner
          await strapi
            .query("api::business-partner-role.business-partner-role")
            .create({ data: roleData });
        }
      }

      return businessPartner;
    });

    return result;
  } catch (error) {
    console.error("Error in createOrUpdate business partner:", error);
    throw error;
  }
};

const createBusinessPartnerNewRecord = async (
  record: any,
  modelName: string
) => {
  try {
    const mappedRecord = mapRecordFields(record, modelName);
    return await createOrUpdate(mappedRecord, true);
  } catch (error) {
    console.error("Error creating new business partner record:", error);
    throw error;
  }
};

const updateBusinessPartnerRecord = async (
  id: string,
  record: any,
  modelName: string
) => {
  try {
    const mappedRecord = mapRecordFields(record, modelName);
    return await createOrUpdate(mappedRecord, false);
  } catch (error) {
    console.error("Error updating business partner record:", error);
    throw error;
  }
};

export { updateBusinessPartnerRecord, createBusinessPartnerNewRecord };
