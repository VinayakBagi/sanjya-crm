import { mapRecordFields } from "./mapping";

const convertStringToBoolean = (value: any): boolean => {
  if (typeof value === "boolean") return value;
  const stringValue = (value || "").toString().toLowerCase();
  return stringValue === "true" || stringValue === "1" || stringValue === "yes";
};

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
      bp_full_name,
      language,
      // Address fields
      country,
      region,
      house_number,
      street_name,
      district,
      city_name,
      postal_code,
      address_time_zone,
      // Contact fields
      phone_number,
      mobile,
      email_address,
      website_url,
      // Extension fields
      native_language,
      purchasing_control,
      // Marketing attribute fields
      conference_room,
      date_opened,
      pool,
      fitness_center,
      renovation_date,
      restaurant,
      seasonal_close_date,
      seasonal_open_date,
    } = formData;

    const processedData: any = {
      bp_id,
      role,
      bp_full_name,
      language,
      country,
      region,
      house_number,
      street_name,
      district,
      city_name,
      postal_code,
      address_time_zone,
      phone_number,
      mobile,
      email_address: email_address?.toLowerCase(),
      website_url,
      native_language,
      purchasing_control,
      conference_room,
      date_opened: convertToDate(date_opened),
      pool,
      fitness_center,
      renovation_date: convertToDate(renovation_date),
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
      const locale = "en";

      if (create) {
        // Create new business partner
        const bpData = {
          bp_id: processedData.bp_id,
          bp_full_name: processedData.bp_full_name,
          language: processedData.language,
          locale,
        };

        businessPartner = await strapi
          .query("api::business-partner.business-partner")
          .create({ data: bpData });

        // Create business partner role
        if (processedData.role) {
          const roleData = {
            bp_role: processedData.role,
            bp_id: businessPartner.bp_id,
            locale,
          };

          await strapi
            .query("api::business-partner-role.business-partner-role")
            .create({ data: roleData });
        }

        // Create address if address fields are provided
        if (
          processedData.house_number ||
          processedData.street_name ||
          processedData.city_name ||
          processedData.country
        ) {
          const addressData = {
            bp_id: businessPartner.bp_id,
            house_number: processedData.house_number,
            street_name: processedData.street_name,
            district: processedData.district,
            city_name: processedData.city_name,
            country: processedData.country,
            postal_code: processedData.postal_code,
            region: processedData.region,
            address_time_zone: processedData.address_time_zone,
            locale,
          };

          const address = await strapi
            .query("api::business-partner-address.business-partner-address")
            .create({ data: addressData });

          // Create default address usage
          await strapi.query("api::bp-address-usage.bp-address-usage").create({
            data: {
              bp_id: businessPartner.bp_id,
              address_usage: "XXDEFAULT",
              bp_address_id: address.bp_address_id,
              validity_start_date: new Date(),
              validity_end_date: new Date("9999-12-29T23:59:59.000Z"),
              locale,
            },
          });

          // Create email address if provided
          if (processedData.email_address) {
            await strapi
              .query("api::bp-email-address.bp-email-address")
              .create({
                data: {
                  address_id: address.bp_address_id,
                  email_address: processedData.email_address,
                  business_partner_address: {
                    connect: [address.id],
                  },
                  locale,
                },
              });
          }

          // Create website URL if provided
          if (processedData.website_url) {
            await strapi
              .query("api::bp-home-page-url.bp-home-page-url")
              .create({
                data: {
                  website_url: processedData.website_url,
                  address_id: address.bp_address_id,
                  business_partner_address: {
                    connect: [address.id],
                  },
                  locale,
                },
              });
          }

          // Create phone number if provided
          if (processedData.phone_number) {
            await strapi.query("api::bp-phone-number.bp-phone-number").create({
              data: {
                phone_number: processedData.phone_number,
                address_id: address.bp_address_id,
                phone_number_type: "1",
                business_partner_address: {
                  connect: [address.id],
                },
                locale,
              },
            });
          }

          // Create mobile number if provided
          if (processedData.mobile) {
            await strapi.query("api::bp-phone-number.bp-phone-number").create({
              data: {
                phone_number: processedData.mobile,
                address_id: address.bp_address_id,
                phone_number_type: "3",
                business_partner_address: {
                  connect: [address.id],
                },
                locale,
              },
            });
          }
        }

        // Create business partner extension if extension fields are provided
        if (processedData.native_language || processedData.purchasing_control) {
          // Check if extension already exists
          const existingExtension = await strapi
            .query("api::business-partner-extension.business-partner-extension")
            .findOne({
              where: { bp_id: businessPartner.bp_id },
            });

          const extensionData = {
            bp_id: businessPartner.bp_id,
            native_language: processedData.native_language,
            purchasing_control: processedData.purchasing_control,
            locale,
          };

          if (existingExtension) {
            // Update existing extension
            await strapi
              .query(
                "api::business-partner-extension.business-partner-extension"
              )
              .update({
                where: { id: existingExtension.id },
                data: {
                  native_language: processedData.native_language,
                  purchasing_control: processedData.purchasing_control,
                },
              });
          } else {
            // Create new extension
            await strapi
              .query(
                "api::business-partner-extension.business-partner-extension"
              )
              .create({ data: extensionData });
          }
        }

        // Create marketing attributes if marketing fields are provided
        if (
          processedData.conference_room ||
          processedData.date_opened ||
          processedData.pool ||
          processedData.fitness_center ||
          processedData.renovation_date ||
          processedData.restaurant ||
          processedData.seasonal_close_date ||
          processedData.seasonal_open_date
        ) {
          // Check if marketing attributes already exist
          const existingMarketing = await strapi
            .query("api::bp-marketing-attribute.bp-marketing-attribute")
            .findOne({
              where: { bp_id: businessPartner.bp_id },
            });

          const marketingData = {
            bp_id: businessPartner.bp_id,
            conference_room: processedData.conference_room,
            date_opened: processedData.date_opened,
            pool: processedData.pool,
            fitness_center: processedData.fitness_center,
            renovation_date: processedData.renovation_date,
            restaurant: processedData.restaurant,
            seasonal_close_date: processedData.seasonal_close_date,
            seasonal_open_date: processedData.seasonal_open_date,
            locale,
          };

          if (existingMarketing) {
            // Update existing marketing attributes
            await strapi
              .query("api::bp-marketing-attribute.bp-marketing-attribute")
              .update({
                where: { id: existingMarketing.id },
                data: {
                  conference_room: processedData.conference_room,
                  date_opened: processedData.date_opened,
                  pool: processedData.pool,
                  fitness_center: processedData.fitness_center,
                  renovation_date: processedData.renovation_date,
                  restaurant: processedData.restaurant,
                  seasonal_close_date: processedData.seasonal_close_date,
                  seasonal_open_date: processedData.seasonal_open_date,
                },
              });
          } else {
            // Create new marketing attributes
            await strapi
              .query("api::bp-marketing-attribute.bp-marketing-attribute")
              .create({ data: marketingData });
          }
        }
      } else {
        // Update existing business partner
        businessPartner = await strapi
          .query("api::business-partner.business-partner")
          .findOne({
            where: { bp_id: processedData.bp_id },
          });

        if (!businessPartner) {
          throw new Error(
            `Business Partner with ID '${processedData.bp_id}' not found`
          );
        }

        // Update main business partner record
        const updateData: any = {};
        if (processedData.bp_full_name)
          updateData.bp_full_name = processedData.bp_full_name;
        if (processedData.language)
          updateData.language = processedData.language;

        if (Object.keys(updateData).length > 0) {
          businessPartner = await strapi
            .query("api::business-partner.business-partner")
            .update({
              where: { id: businessPartner.id },
              data: updateData,
            });
        }

        // Update address if address fields are provided
        if (
          processedData.house_number ||
          processedData.street_name ||
          processedData.city_name ||
          processedData.country
        ) {
          const address = await strapi
            .query("api::business-partner-address.business-partner-address")
            .findOne({
              where: {
                bp_id: businessPartner.bp_id,
                address_usages: {
                  address_usage: "XXDEFAULT",
                },
              },
            });

          if (address) {
            const addressUpdateData: any = {};
            if (processedData.house_number)
              addressUpdateData.house_number = processedData.house_number;
            if (processedData.street_name)
              addressUpdateData.street_name = processedData.street_name;
            if (processedData.district)
              addressUpdateData.district = processedData.district;
            if (processedData.city_name)
              addressUpdateData.city_name = processedData.city_name;
            if (processedData.country)
              addressUpdateData.country = processedData.country;
            if (processedData.postal_code)
              addressUpdateData.postal_code = processedData.postal_code;
            if (processedData.region)
              addressUpdateData.region = processedData.region;
            if (processedData.address_time_zone)
              addressUpdateData.address_time_zone =
                processedData.address_time_zone;

            if (Object.keys(addressUpdateData).length > 0) {
              await strapi
                .query("api::business-partner-address.business-partner-address")
                .update({
                  where: { id: address.id },
                  data: addressUpdateData,
                });
            }

            // Update email address
            if (processedData.email_address) {
              const email = await strapi
                .query("api::bp-email-address.bp-email-address")
                .findOne({
                  where: { business_partner_address: address.id },
                });

              if (email) {
                await strapi
                  .query("api::bp-email-address.bp-email-address")
                  .update({
                    where: { id: email.id },
                    data: { email_address: processedData.email_address },
                  });
              } else {
                await strapi
                  .query("api::bp-email-address.bp-email-address")
                  .create({
                    data: {
                      address_id: address.bp_address_id,
                      email_address: processedData.email_address,
                      business_partner_address: {
                        connect: [address.id],
                      },
                      locale,
                    },
                  });
              }
            }

            // Update website URL
            if (processedData.website_url) {
              const website = await strapi
                .query("api::bp-home-page-url.bp-home-page-url")
                .findOne({
                  where: { business_partner_address: address.id },
                });

              if (website) {
                await strapi
                  .query("api::bp-home-page-url.bp-home-page-url")
                  .update({
                    where: { id: website.id },
                    data: { website_url: processedData.website_url },
                  });
              } else {
                await strapi
                  .query("api::bp-home-page-url.bp-home-page-url")
                  .create({
                    data: {
                      website_url: processedData.website_url,
                      address_id: address.bp_address_id,
                      business_partner_address: {
                        connect: [address.id],
                      },
                      locale,
                    },
                  });
              }
            }

            // Update phone number
            if (processedData.phone_number) {
              const phone = await strapi
                .query("api::bp-phone-number.bp-phone-number")
                .findOne({
                  where: {
                    business_partner_address: address.id,
                    phone_number_type: "1",
                  },
                });

              if (phone) {
                await strapi
                  .query("api::bp-phone-number.bp-phone-number")
                  .update({
                    where: { id: phone.id },
                    data: { phone_number: processedData.phone_number },
                  });
              } else {
                await strapi
                  .query("api::bp-phone-number.bp-phone-number")
                  .create({
                    data: {
                      phone_number: processedData.phone_number,
                      address_id: address.bp_address_id,
                      phone_number_type: "1",
                      business_partner_address: {
                        connect: [address.id],
                      },
                      locale,
                    },
                  });
              }
            }

            // Update mobile number
            if (processedData.mobile) {
              const mobile = await strapi
                .query("api::bp-phone-number.bp-phone-number")
                .findOne({
                  where: {
                    business_partner_address: address.id,
                    phone_number_type: "3",
                  },
                });

              if (mobile) {
                await strapi
                  .query("api::bp-phone-number.bp-phone-number")
                  .update({
                    where: { id: mobile.id },
                    data: { phone_number: processedData.mobile },
                  });
              } else {
                await strapi
                  .query("api::bp-phone-number.bp-phone-number")
                  .create({
                    data: {
                      phone_number: processedData.mobile,
                      address_id: address.bp_address_id,
                      phone_number_type: "3",
                      business_partner_address: {
                        connect: [address.id],
                      },
                      locale,
                    },
                  });
              }
            }
          }
        }

        // Update business partner extension
        if (processedData.native_language || processedData.purchasing_control) {
          const extension = await strapi
            .query("api::business-partner-extension.business-partner-extension")
            .findOne({
              where: { bp_id: businessPartner.bp_id },
            });

          const extensionUpdateData: any = {};
          if (processedData.native_language)
            extensionUpdateData.native_language = processedData.native_language;
          if (processedData.purchasing_control)
            extensionUpdateData.purchasing_control =
              processedData.purchasing_control;

          if (extension && Object.keys(extensionUpdateData).length > 0) {
            await strapi
              .query(
                "api::business-partner-extension.business-partner-extension"
              )
              .update({
                where: { id: extension.id },
                data: extensionUpdateData,
              });
          } else if (
            !extension &&
            Object.keys(extensionUpdateData).length > 0
          ) {
            await strapi
              .query(
                "api::business-partner-extension.business-partner-extension"
              )
              .create({
                data: {
                  bp_id: businessPartner.bp_id,
                  ...extensionUpdateData,
                  locale,
                },
              });
          }
        }

        // Update marketing attributes
        if (
          processedData.conference_room ||
          processedData.date_opened ||
          processedData.pool ||
          processedData.fitness_center ||
          processedData.renovation_date ||
          processedData.restaurant ||
          processedData.seasonal_close_date ||
          processedData.seasonal_open_date
        ) {
          const marketing = await strapi
            .query("api::bp-marketing-attribute.bp-marketing-attribute")
            .findOne({
              where: { bp_id: businessPartner.bp_id },
            });

          const marketingUpdateData: any = {};
          if (processedData.conference_room)
            marketingUpdateData.conference_room = processedData.conference_room;
          if (processedData.date_opened)
            marketingUpdateData.date_opened = processedData.date_opened;
          if (processedData.pool) marketingUpdateData.pool = processedData.pool;
          if (processedData.fitness_center)
            marketingUpdateData.fitness_center = processedData.fitness_center;
          if (processedData.renovation_date)
            marketingUpdateData.renovation_date = processedData.renovation_date;
          if (processedData.restaurant)
            marketingUpdateData.restaurant = processedData.restaurant;
          if (processedData.seasonal_close_date)
            marketingUpdateData.seasonal_close_date =
              processedData.seasonal_close_date;
          if (processedData.seasonal_open_date)
            marketingUpdateData.seasonal_open_date =
              processedData.seasonal_open_date;

          if (marketing && Object.keys(marketingUpdateData).length > 0) {
            await strapi
              .query("api::bp-marketing-attribute.bp-marketing-attribute")
              .update({
                where: { id: marketing.id },
                data: marketingUpdateData,
              });
          } else if (
            !marketing &&
            Object.keys(marketingUpdateData).length > 0
          ) {
            await strapi
              .query("api::bp-marketing-attribute.bp-marketing-attribute")
              .create({
                data: {
                  bp_id: businessPartner.bp_id,
                  ...marketingUpdateData,
                  locale,
                },
              });
          }
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
  modelName: string,
  type?: string
) => {
  try {
    const mappedRecord = mapRecordFields(record, modelName, type);
    return await createOrUpdate(mappedRecord, true);
  } catch (error) {
    console.error("Error creating new business partner record:", error);
    throw error;
  }
};

const updateBusinessPartnerRecord = async (
  id: string,
  record: any,
  modelName: string,
  type?: string
) => {
  try {
    const mappedRecord = mapRecordFields(record, modelName, type);
    return await createOrUpdate({ ...mappedRecord }, false);
  } catch (error) {
    console.error("Error updating business partner record:", error);
    throw error;
  }
};

export { updateBusinessPartnerRecord, createBusinessPartnerNewRecord };
