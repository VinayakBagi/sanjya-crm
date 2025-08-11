import { generateUniqueID } from "../../../utils/cpi";
import { mapRecordFields } from "./mapping";

// Mapping function for opt-in values
const mapOptInValue = (value: any): boolean | null => {
  const numValue = parseInt(value?.toString() || "");
  switch (numValue) {
    case 101:
      return true; // Yes
    case 111:
      return false; // No
    case 121:
      return null; // Unselected
    default:
      return null; // Default to Unselected for any other value
  }
};

const createOrUpdate = async (formData, create = true) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      native_language,
      emails_opt_in,
      job_title,
      sms_promotions_opt_in,
      print_marketing_opt_in,
      contact_person_department_name,
      contact_person_vip_type,
      buying_guide_opt_in,
      last_login,
      web_user_id,
      bp_company_id,
      is_marked_for_archiving,
      country,
    } = formData;
    let { bp_id, contact_person_department } = formData;

    contact_person_department = (contact_person_department || "")
      .toString()
      .padStart(4, "0");

    const punch_out_user =
      (formData.punch_out_user || "").toLowerCase() === "true";
    const approver = (formData.approver || "").toLowerCase() === "true";
    const admin_user = (formData.admin_user || "").toLowerCase() === "true";
    const web_registered =
      (formData.web_registered || "").toLowerCase() === "true";

    // Map opt-in values from numeric codes to boolean/null
    const mappedEmailsOptIn = mapOptInValue(emails_opt_in);
    const mappedSmsPromotionsOptIn = mapOptInValue(sms_promotions_opt_in);
    const mappedPrintMarketingOptIn = mapOptInValue(print_marketing_opt_in);
    const mappedBuyingGuideOptIn = mapOptInValue(buying_guide_opt_in);

    const locale = "en";

    const newBP = await strapi.db.transaction(async () => {
      if (!bp_id) {
        bp_id = `S${await generateUniqueID("bp_contact_id_seq")}`;
      }
      let data: any = {
        bp_full_name: [first_name, last_name].filter(Boolean).join(" ").trim(),
        first_name,
        middle_name,
        last_name,
        locale,
        bp_id,
        is_marked_for_archiving: is_marked_for_archiving != 2,
      };

      let bp_person: any;
      if (create) {
        bp_person = await strapi
          .query("api::business-partner.business-partner")
          .create({ data });
      } else {
        // Find existing business partner person
        bp_person = await strapi
          .query("api::business-partner.business-partner")
          .findOne({
            where: { bp_id: bp_id },
          });

        // Update existing business partner person if found
        if (bp_person) {
          bp_person = await strapi
            .query("api::business-partner.business-partner")
            .update({
              where: { id: bp_person.id },
              data: {
                bp_full_name: data.bp_full_name,
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name,
                is_marked_for_archiving: data.is_marked_for_archiving,
              },
            });
        }
      }

      // Find BP extension
      const bpExtension = await strapi.db
        .query("api::business-partner-extension.business-partner-extension")
        .findOne({
          where: { bp_id: bp_person.bp_id },
        });

      if (bpExtension) {
        // **Update BP extension**
        await strapi
          .query("api::business-partner-extension.business-partner-extension")
          .update({
            where: { id: bpExtension.id },
            data: {
              job_title,
              web_registered,
              emails_opt_in: mappedEmailsOptIn,
              print_marketing_opt_in: mappedPrintMarketingOptIn,
              sms_promotions_opt_in: mappedSmsPromotionsOptIn,
              native_language,
              buying_guide_opt_in: mappedBuyingGuideOptIn,
              admin_user,
              last_login,
              web_user_id,
              approver,
              punch_out_user,
            },
          });
      } else {
        // **Create BP extension if not exists**
        await strapi
          .query("api::business-partner-extension.business-partner-extension")
          .create({
            data: {
              bp_id: bp_person.bp_id,
              job_title,
              web_registered,
              emails_opt_in: mappedEmailsOptIn,
              print_marketing_opt_in: mappedPrintMarketingOptIn,
              sms_promotions_opt_in: mappedSmsPromotionsOptIn,
              native_language,
              locale: bp_person.locale,
              buying_guide_opt_in: mappedBuyingGuideOptIn,
              admin_user,
              last_login,
              web_user_id,
              approver,
              punch_out_user,
            },
          });
      }

      // Assign a BP Role
      data = {
        bp_role: "BUP001",
        bp_id: bp_person.bp_id,
        locale,
      };

      await strapi
        .query("api::business-partner-role.business-partner-role")
        .create({ data });

      // **Find or Create Business Partner Relationship**
      let bp_relationship = await strapi
        .query(
          "api::business-partner-relationship.business-partner-relationship"
        )
        .findOne({
          where: {
            bp_id1: bp_company_id,
            bp_id2: bp_person.bp_id,
          },
        });

      if (!bp_relationship) {
        data = {
          relationship_number: `REL${Date.now()}`, // Generate a unique relationship number
          bp_id1: bp_company_id, // Company
          bp_id2: bp_person.bp_id, // Contact
          validity_start_date: new Date(),
          validity_end_date: new Date("9999-12-29T23:59:59.000Z"),
          locale,
        };

        bp_relationship = await strapi
          .query(
            "api::business-partner-relationship.business-partner-relationship"
          )
          .create({ data });
      }

      // Create BP Contact linked to Relationship
      data = {
        bp_person_id: bp_person.bp_id,
        bp_company_id: bp_company_id,
        relationship_number: bp_relationship.relationship_number,
        relationship: bp_relationship.id, // Link to relationship
        validity_start_date: new Date(),
        validity_end_date: new Date("9999-12-29T23:59:59.000Z"),
        locale,
      };

      const existingContact = await strapi.db
        .query("api::business-partner-contact.business-partner-contact")
        .findOne({
          where: {
            relationship_number: data.relationship_number,
            bp_person_id: data.bp_person_id,
            bp_company_id: data.bp_company_id,
            locale,
          },
        });

      let bpContact;
      if (existingContact) {
        // Update the existing business partner contact
        bpContact = await strapi.db
          .query("api::business-partner-contact.business-partner-contact")
          .update({
            where: { documentId: existingContact.documentId },
            data,
          });
      } else {
        // Create a new business partner contact
        bpContact = await strapi.db
          .query("api::business-partner-contact.business-partner-contact")
          .create({
            data,
          });
      }

      // **Insert Department & Function**
      if (
        contact_person_department ||
        // contact_person_function ||
        contact_person_vip_type
      ) {
        data = {
          bp_person_id: bp_person.bp_id,
          bp_company_id: bp_company_id,
          relationship_number: bp_relationship.relationship_number,
          relationship: bp_relationship.id, // Link to relationship
          validity_start_date: new Date(),
          validity_end_date: new Date("9999-12-29T23:59:59.000Z"),
          locale,
        };

        if (contact_person_department) {
          data.contact_person_department = contact_person_department;
          data.contact_person_department_name = contact_person_department_name;
        }

        // If VIP is true, reset others first
        if (contact_person_vip_type === true) {
          await strapi.db
            .query(
              "api::bp-contact-to-func-and-dept.bp-contact-to-func-and-dept"
            )
            .updateMany({
              where: {
                bp_company_id: bp_company_id,
                contact_person_vip_type: true,
              },
              data: { contact_person_vip_type: false },
            });
        }

        if (typeof contact_person_vip_type === "boolean") {
          data.contact_person_vip_type = contact_person_vip_type;
        }

        await strapi
          .query("api::bp-contact-to-func-and-dept.bp-contact-to-func-and-dept")
          .create({ data });
      }

      // Find Default Address
      const address = await strapi.db
        .query("api::business-partner-address.business-partner-address")
        .findOne({
          where: {
            bp_id: bp_company_id,
            address_usages: {
              address_usage: "XXDEFAULT",
            },
          },
        });

      // Create Contact Address linked to Relationship
      data = {
        house_number: address?.house_number,
        additional_street_prefix_name: address?.additional_street_prefix_name,
        additional_street_suffix_name: address?.additional_street_suffix_name,
        street_name: address?.street_name,
        city_name: address?.city_name,
        country: country || address?.country,
        county_code: country || address?.county_code,
        postal_code: address?.postal_code,
        region: address?.region,
        validity_start_date: new Date(),
        validity_end_date: new Date("9999-12-29T23:59:59.000Z"),
        bp_id: bp_person.bp_id,
        locale,
      };

      const contact_address = await strapi
        .query("api::business-partner-address.business-partner-address")
        .create({ data });

      // Create Contact Info (Email, Phone, Fax, Website) linked to Relationship
      const contactInfoTypes = [
        {
          key: "email_address",
          table: "bp-email-address.bp-email-address",
        },
        { key: "fax_number", table: "bp-fax-number.bp-fax-number" },
        { key: "website_url", table: "bp-home-page-url.bp-home-page-url" },
        { key: "phone_number", table: "bp-phone-number.bp-phone-number" },
        { key: "mobile", table: "bp-phone-number.bp-phone-number" },
      ];

      for (const info of contactInfoTypes) {
        if (formData[info.key]) {
          if (["phone_number", "mobile"].includes(info.key)) {
            data = {
              phone_number: formData[info.key],
              destination_location_country: country || "",
              phone_number_type: info.key === "phone_number" ? "1" : "3",
              address_id: contact_address.bp_address_id,
              business_partner_address: {
                connect: [contact_address.id],
              },
              locale,
            };
            const t: any = `api::${info.table}`;
            await strapi.query(t).create({ data });
          } else if (!["phone_number", "mobile"].includes(info.key)) {
            if (info.key === "email_address") {
              data = {
                [info.key]: formData[info.key]?.toLowerCase(),
                address_id: contact_address.bp_address_id,
                business_partner_address: {
                  connect: [contact_address.id],
                },
                locale,
              };
            } else {
              data = {
                [info.key]: formData[info.key],
                address_id: contact_address.bp_address_id,
                business_partner_address: {
                  connect: [contact_address.id],
                },
                locale,
              };
            }

            const t: any = `api::${info.table}`;
            await strapi.query(t).create({ data });
          }
        }
      }

      // setImmediate(async () => {
      //     await ReplicateBusinessPartnerContact(bp_id);
      // });

      return bpContact;
    });
  } catch (error) {
    console.error("Error in createOrUpdate:", error);
  }
};

const createContactNewRecord = async (record: any, modelName: string) => {
  try {
    const mappedRecord = mapRecordFields(record, modelName);
    await createOrUpdate(mappedRecord, true);
  } catch (error) {
    console.error("Error creating new record:", error);
    throw error;
  }
};

const updateContactRecord = async (
  id: string,
  record: any,
  modelName: string
) => {
  try {
    const mappedRecord = mapRecordFields(record, modelName);
    await createOrUpdate(mappedRecord, false);
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
};

export { updateContactRecord, createContactNewRecord };
