/**
 * business-partner controller
 */

import { factories } from "@strapi/strapi";
import { Context } from "koa";
import { generateUniqueID } from "../../../utils/cpi";

export default factories.createCoreController(
  "api::business-partner.business-partner",
  ({ strapi }) => ({
    async registration(ctx: Context) {
      try {
        const {
          bp_full_name,
          email_address,
          fax_number,
          website_url,
          destination_location_country,
          phone_number,
          mobile,
          house_number,
          additional_street_prefix_name,
          additional_street_suffix_name,
          street_name,
          city_name,
          country,
          county_code,
          postal_code,
          region,
          contacts,
          employees,
        } = ctx.request.body;

        if (
          !bp_full_name ||
          !Array.isArray(contacts) ||
          !Array.isArray(employees)
        ) {
          return ctx.throw(
            400,
            "Missing required fields or invalid contacts array or invalid employees array"
          );
        }

        const locale = "en";

        const newBP = await strapi.db.transaction(async () => {
          const bp_id = `P${await generateUniqueID("bp_prospect_id_seq")}`;
          let data: any = { bp_id, bp_full_name, locale };
          const bp_company = await strapi
            .query("api::business-partner.business-partner")
            .create({
              data,
            });

          data = {
            bp_role: "PRO001",
            bp_id: bp_company.bp_id,
            locale,
          };

          await strapi
            .query("api::business-partner-role.business-partner-role")
            .create({
              data,
            });

          data = {
            bp_id: bp_company.bp_id,
            house_number,
            additional_street_prefix_name,
            additional_street_suffix_name,
            street_name,
            city_name,
            country,
            county_code,
            postal_code,
            region,
            locale,
          };

          const address = await strapi
            .query("api::business-partner-address.business-partner-address")
            .create({ data });

          data = {
            bp_id: bp_company.bp_id,
            address_usage: "XXDEFAULT",
            bp_address_id: address.bp_address_id,
            validity_start_date: new Date(),
            validity_end_date: new Date("9999-12-29T23:59:59.000Z"),
            locale,
          };

          await strapi
            .query("api::bp-address-usage.bp-address-usage")
            .create({ data });

          data = {
            address_id: address.bp_address_id,
            email_address: email_address?.toLowerCase(),
            business_partner_address: {
              connect: [address.id],
            },
            locale,
          };

          await strapi
            .query("api::bp-email-address.bp-email-address")
            .create({ data });

          data = {
            fax_number,
            address_id: address.bp_address_id,
            business_partner_address: {
              connect: [address.id],
            },
            locale,
          };

          await strapi
            .query("api::bp-fax-number.bp-fax-number")
            .create({ data });

          data = {
            website_url,
            address_id: address.bp_address_id,
            business_partner_address: {
              connect: [address.id],
            },
            locale,
          };

          await strapi
            .query("api::bp-home-page-url.bp-home-page-url")
            .create({ data });

          if (phone_number) {
            data = {
              phone_number,
              address_id: address.bp_address_id,
              destination_location_country,
              phone_number_type: "1",
              business_partner_address: {
                connect: [address.id],
              },
              locale,
            };

            await strapi
              .query("api::bp-phone-number.bp-phone-number")
              .create({ data });
          }

          if (mobile) {
            data = {
              address_id: address.bp_address_id,
              destination_location_country,
              phone_number: mobile,
              phone_number_type: "3",
              business_partner_address: {
                connect: [address.id],
              },
              locale,
            };

            await strapi
              .query("api::bp-phone-number.bp-phone-number")
              .create({ data });
          }

          // ✅ Insert related Contacts
          for (const contact of contacts) {
            if (contact.bp_person_id) {
              // **Find or Create Business Partner Relationship**
              let bp_relationship = await strapi
                .query(
                  "api::business-partner-relationship.business-partner-relationship"
                )
                .findOne({
                  where: {
                    bp_id1: bp_company.bp_id,
                    bp_id2: contact.bp_person_id,
                  },
                });

              if (!bp_relationship) {
                data = {
                  relationship_number: `REL${Date.now()}`,
                  bp_id1: bp_company.bp_id, // Company
                  bp_id2: contact.bp_person_id, // Contact
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
                bp_person_id: contact.bp_person_id,
                bp_company_id: bp_company.bp_id,
                relationship_number: bp_relationship.relationship_number,
                relationship: bp_relationship.id, // Link to relationship
                validity_start_date: new Date(),
                validity_end_date: new Date("9999-12-29T23:59:59.000Z"),
                locale,
              };

              await strapi
                .query("api::business-partner-contact.business-partner-contact")
                .create({ data });

              // **Insert Department & Function**
              if (
                contact?.contact_person_department ||
                contact?.contact_person_function
              ) {
                data = {
                  bp_person_id: contact.bp_person_id,
                  bp_company_id: bp_company.bp_id,
                  relationship_number: bp_relationship.relationship_number,
                  relationship: bp_relationship.id, // Link to relationship
                  validity_start_date: new Date(),
                  validity_end_date: new Date("9999-12-29T23:59:59.000Z"),
                  locale,
                };

                if (contact?.contact_person_department) {
                  data.contact_person_department =
                    contact?.contact_person_department;
                  data.contact_person_department_name =
                    contact?.contact_person_department_name;
                }

                if (contact?.contact_person_function) {
                  data.contact_person_function =
                    contact?.contact_person_function;
                  data.contact_person_function_name =
                    contact?.contact_person_function_name;
                }

                await strapi
                  .query(
                    "api::bp-contact-to-func-and-dept.bp-contact-to-func-and-dept"
                  )
                  .create({ data });
              }
            } else {
              const contact_bp_id = `S${await generateUniqueID("bp_contact_id_seq")}`;
              data = {
                bp_id: contact_bp_id,
                bp_full_name: [contact?.first_name, contact?.last_name]
                  .filter(Boolean)
                  .join(" ")
                  .trim(),
                first_name: contact?.first_name,
                middle_name: contact?.middle_name,
                last_name: contact?.last_name,
                locale,
              };
              const bp_person = await strapi
                .query("api::business-partner.business-partner")
                .create({ data });

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
                    bp_id1: bp_company.bp_id,
                    bp_id2: bp_person.bp_id,
                  },
                });

              if (!bp_relationship) {
                data = {
                  relationship_number: `REL${Date.now()}`,
                  bp_id1: bp_company.bp_id, // Company
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
                bp_company_id: bp_company.bp_id,
                relationship_number: bp_relationship.relationship_number,
                relationship: bp_relationship.id, // Link to relationship
                validity_start_date: new Date(),
                validity_end_date: new Date("9999-12-29T23:59:59.000Z"),
                locale,
              };

              await strapi
                .query("api::business-partner-contact.business-partner-contact")
                .create({ data });

              // **Insert Department & Function**
              if (
                contact?.contact_person_department ||
                contact?.contact_person_function
              ) {
                data = {
                  bp_person_id: bp_person.bp_id,
                  bp_company_id: bp_company.bp_id,
                  relationship_number: bp_relationship.relationship_number,
                  relationship: bp_relationship.id, // Link to relationship
                  validity_start_date: new Date(),
                  validity_end_date: new Date("9999-12-29T23:59:59.000Z"),
                  locale,
                };

                if (contact?.contact_person_department) {
                  data.contact_person_department =
                    contact?.contact_person_department;
                  data.contact_person_department_name =
                    contact?.contact_person_department_name;
                }

                if (contact?.contact_person_function) {
                  data.contact_person_function =
                    contact?.contact_person_function;
                  data.contact_person_function_name =
                    contact?.contact_person_function_name;
                }

                await strapi
                  .query(
                    "api::bp-contact-to-func-and-dept.bp-contact-to-func-and-dept"
                  )
                  .create({ data });
              }

              data = {
                house_number,
                additional_street_prefix_name,
                additional_street_suffix_name,
                street_name,
                city_name,
                country,
                county_code,
                postal_code,
                region,
                validity_start_date: new Date(),
                validity_end_date: new Date("9999-12-29T23:59:59.000Z"),
                bp_id: bp_person.bp_id,
                locale,
              };

              const contact_address = await strapi
                .query("api::business-partner-address.business-partner-address")
                .create({ data });

              data = {
                address_id: contact_address.bp_address_id,
                email_address: contact?.email_address?.toLowerCase(),
                business_partner_address: {
                  connect: [contact_address.id],
                },
                locale,
              };

              await strapi
                .query("api::bp-email-address.bp-email-address")
                .create({ data });

              data = {
                address_id: contact_address.bp_address_id,
                fax_number: contact?.fax_number,
                business_partner_address: {
                  connect: [contact_address.id],
                },
                locale,
              };

              await strapi
                .query("api::bp-fax-number.bp-fax-number")
                .create({ data });

              data = {
                address_id: contact_address.bp_address_id,
                website_url: contact?.website_url,
                business_partner_address: {
                  connect: [contact_address.id],
                },
                locale,
              };

              await strapi
                .query("api::bp-home-page-url.bp-home-page-url")
                .create({ data });

              if (contact?.phone_number) {
                data = {
                  address_id: contact_address.bp_address_id,
                  destination_location_country:
                    contact?.destination_location_country,
                  phone_number: contact?.phone_number,
                  phone_number_type: "1",
                  business_partner_address: {
                    connect: [contact_address.id],
                  },
                  locale,
                };

                await strapi
                  .query("api::bp-phone-number.bp-phone-number")
                  .create({ data });
              }

              if (contact?.mobile) {
                data = {
                  destination_location_country:
                    contact?.destination_location_country,
                  phone_number: contact?.mobile,
                  phone_number_type: "3",
                  business_partner_address: {
                    connect: [contact_address.id],
                  },
                  locale,
                };

                await strapi
                  .query("api::bp-phone-number.bp-phone-number")
                  .create({ data });
              }
            }
          }

          // ✅ Insert related employees
          data = {
            customer_id: bp_company?.bp_id,
            order_is_blocked_for_customer: "Y1",
            bp_id: bp_company?.bp_id,
            locale,
          };
          // const customer = await strapi
          //   .query("api::customer.customer")
          //   .create({ data });

          // for (const employee of employees) {
          //   data = {
          //     sales_organization: "1000",
          //     distribution_channel: "10",
          //     division: "00",
          //     partner_function: employee?.partner_function,
          //     bp_customer_number: employee?.bp_customer_number,
          //     customer_id: customer?.customer_id,
          //     locale,
          //   };

          //   await strapi
          //     .query("api::customer-partner-function.customer-partner-function")
          //     .create({ data });
          // }

          return bp_company;
        });

        return ctx.send({
          message: "Business partner and contacts registered successfully",
          data: newBP,
        });
      } catch (error) {
        return ctx.internalServerError(
          `Failed to register business-partner: ${error.message}`
        );
      }
    },
    async save(ctx: Context) {
      try {
        const { documentId } = ctx.params;
        const {
          bp_full_name,
          email_address,
          fax_number,
          website_url,
          destination_location_country,
          phone_number,
          mobile,
          house_number,
          additional_street_prefix_name,
          additional_street_suffix_name,
          street_name,
          city_name,
          country,
          county_code,
          postal_code,
          region,
        } = ctx.request.body;

        if (!documentId) {
          return ctx.throw(
            400,
            "Business Partner document id is missing in URL param"
          );
        }

        const updateBP = await strapi.db.transaction(async () => {
          const bp_company = await strapi
            .documents("api::business-partner.business-partner")
            .update({ documentId, data: { bp_full_name } });

          const address = await strapi.db
            .query("api::business-partner-address.business-partner-address")
            .findOne({
              where: {
                bp_id: bp_company.bp_id,
                address_usages: {
                  address_usage: "XXDEFAULT",
                },
              },
            });

          if (address) {
            await strapi
              .query("api::business-partner-address.business-partner-address")
              .update({
                where: { id: address.id },
                data: {
                  house_number,
                  additional_street_prefix_name,
                  additional_street_suffix_name,
                  street_name,
                  city_name,
                  country,
                  county_code,
                  postal_code,
                  region,
                },
              });

            // Email Address
            const email = await strapi
              .query("api::bp-email-address.bp-email-address")
              .findOne({
                where: {
                  business_partner_address: address.id,
                },
              });

            if (email) {
              await strapi
                .query("api::bp-email-address.bp-email-address")
                .update({
                  where: { id: email.id },
                  data: { email_address: email_address?.toLowerCase() },
                });
            } else {
              await strapi
                .query("api::bp-email-address.bp-email-address")
                .create({
                  data: {
                    address_id: address.bp_address_id,
                    email_address: email_address?.toLowerCase(),
                    business_partner_address: {
                      connect: [address.id],
                    },
                    locale: address.locale,
                  },
                });
            }

            // Fax Number
            const fax = await strapi
              .query("api::bp-fax-number.bp-fax-number")
              .findOne({
                where: {
                  business_partner_address: address.id,
                },
              });

            if (fax) {
              await strapi.query("api::bp-fax-number.bp-fax-number").update({
                where: { id: fax.id },
                data: { fax_number },
              });
            } else {
              await strapi.query("api::bp-fax-number.bp-fax-number").create({
                data: {
                  fax_number,
                  address_id: address.bp_address_id,
                  business_partner_address: {
                    connect: [address.id],
                  },
                  locale: address.locale,
                },
              });
            }

            // Website URL
            const website = await strapi
              .query("api::bp-home-page-url.bp-home-page-url")
              .findOne({
                where: {
                  business_partner_address: address.id,
                },
              });

            if (website) {
              await strapi
                .query("api::bp-home-page-url.bp-home-page-url")
                .update({
                  where: { id: website.id },
                  data: { website_url },
                });
            } else {
              await strapi
                .query("api::bp-home-page-url.bp-home-page-url")
                .create({
                  data: {
                    website_url,
                    address_id: address.bp_address_id,
                    business_partner_address: {
                      connect: [address.id],
                    },
                    locale: address.locale,
                  },
                });
            }

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
                  data: { phone_number, destination_location_country },
                });
            } else {
              await strapi
                .query("api::bp-phone-number.bp-phone-number")
                .create({
                  data: {
                    destination_location_country: destination_location_country,
                    phone_number: phone_number,
                    phone_number_type: "1",
                    address_id: address.bp_address_id,
                    business_partner_address: {
                      connect: [address.id],
                    },
                    locale: address.locale,
                  },
                });
            }

            const mobileData = await strapi
              .query("api::bp-phone-number.bp-phone-number")
              .findOne({
                where: {
                  business_partner_address: address.id,
                  phone_number_type: "3",
                },
              });

            if (mobileData) {
              await strapi
                .query("api::bp-phone-number.bp-phone-number")
                .update({
                  where: { id: mobileData.id },
                  data: { phone_number: mobile, destination_location_country },
                });
            } else {
              await strapi
                .query("api::bp-phone-number.bp-phone-number")
                .create({
                  data: {
                    destination_location_country: destination_location_country,
                    phone_number: mobile,
                    phone_number_type: "3",
                    address_id: address.bp_address_id,
                    business_partner_address: {
                      connect: [address.id],
                    },
                    locale: address.locale,
                  },
                });
            }
          }

          return bp_company;
        });

        return ctx.send({
          message: "Business partner save successfully",
          data: updateBP,
        });
      } catch (error) {
        return ctx.internalServerError(
          `Failed to register business-partner: ${error.message}`
        );
      }
    },
  })
);
