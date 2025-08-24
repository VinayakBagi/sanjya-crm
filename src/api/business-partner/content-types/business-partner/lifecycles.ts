export default {
  async beforeCreate(event) {
    const { params } = event;

    // Connect data with bp if available any
    if (params?.data?.bp_id) {
      const notes = await strapi.query("api::crm-note.crm-note").findMany({
        filters: { bp_id: params.data.bp_id },
      });

      if (notes.length > 0) {
        params.data.notes = notes.map((note) => note.id);
      }

      const bpMarketingAttributes = await strapi
        .query("api::bp-marketing-attribute.bp-marketing-attribute")
        .findOne({ where: { bp_id: params.data.bp_id } });

      if (bpMarketingAttributes) {
        params.data.marketing_attributes = {
          connect: [bpMarketingAttributes.id],
        };
      }

      const bpExtension = await strapi
        .query("api::business-partner-extension.business-partner-extension")
        .findOne({ where: { bp_id: params.data.bp_id } });

      if (bpExtension) {
        params.data.bp_extension = { connect: [bpExtension.id] };
      }

      const activities = await strapi
        .query("api::crm-activity.crm-activity")
        .findMany({
          filters: { main_account_party_id: params.data.bp_id },
        });

      if (activities.length > 0) {
        params.data.activities = activities.map((activity) => activity.id);
      }
    }
  },
  async beforeUpdate(event) {
    const { params } = event;
    // Connect data with bp if available any
    if (params?.data?.bp_id) {
      const notes = await strapi.query("api::crm-note.crm-note").findMany({
        filters: { bp_id: params.data.bp_id },
      });

      if (notes.length > 0) {
        params.data.notes = notes.map((note) => note.id);
      }

      const bpMarketingAttributes = await strapi
        .query("api::bp-marketing-attribute.bp-marketing-attribute")
        .findOne({ where: { bp_id: params.data.bp_id } });

      if (bpMarketingAttributes) {
        params.data.marketing_attributes = {
          connect: [bpMarketingAttributes.id],
        };
      }

      const bpExtension = await strapi
        .query("api::business-partner-extension.business-partner-extension")
        .findOne({ where: { bp_id: params.data.bp_id } });

      if (bpExtension) {
        params.data.bp_extension = { connect: [bpExtension.id] };
      }

      const activities = await strapi
        .query("api::crm-activity.crm-activity")
        .findMany({
          filters: { main_account_party_id: params.data.bp_id },
        });

      if (activities.length > 0) {
        params.data.activities = activities.map((activity) => activity.id);
      }
    }
  },
  async beforeDelete(event) {
    const { where } = event.params;
    const id = where.id;

    // Find related roles
    const roles = await strapi.db
      .query("api::business-partner-role.business-partner-role")
      .findMany({
        where: { business_partner: id },
        select: ["id"],
      });

    // Delete roles one by one (to trigger their hooks)
    for (const role of roles) {
      await strapi.db
        .query("api::business-partner-role.business-partner-role")
        .delete({
          where: { id: role.id },
        });
    }

    // Find related address usages
    const address_usages = await strapi.db
      .query("api::bp-address-usage.bp-address-usage")
      .findMany({
        where: { business_partner: id },
        select: ["id"],
      });

    // Delete address usages one by one (to trigger their hooks)
    for (const address_usage of address_usages) {
      await strapi.db.query("api::bp-address-usage.bp-address-usage").delete({
        where: { id: address_usage.id },
      });
    }

    // Find related addresses
    const addresses = await strapi.db
      .query("api::business-partner-address.business-partner-address")
      .findMany({
        where: {
          business_partner: id,
          bp_address_id: {
            $startsWith: "ADD",
          },
        },
        select: ["id"],
      });

    // Delete addresses one by one (to trigger their hooks)
    for (const address of addresses) {
      await strapi.db
        .query("api::business-partner-address.business-partner-address")
        .delete({
          where: { id: address.id },
        });
    }

    // Find related customer
    // const customer = await strapi.db.query("api::customer.customer").findOne({
    //   where: { business_partner: id },
    //   select: ["id"],
    // });

    // if (customer) {
    //   // Find related customer partner function
    //   const customerPFs = await strapi.db
    //     .query("api::customer-partner-function.customer-partner-function")
    //     .findMany({
    //       where: { customer: customer?.id },
    //       select: ["id"],
    //     });

    //   // Delete address usages one by one (to trigger their hooks)
    //   for (const customerPF of customerPFs) {
    //     await strapi.db
    //       .query("api::customer-partner-function.customer-partner-function")
    //       .delete({
    //         where: { id: customerPF.id },
    //       });
    //   }

    //   await await strapi.db
    //     .query("api::customer.customer")
    //     .delete({ where: { id: customer?.id } });
    // }

    // Find related BP Contacts and delete them
    const bpContacts = await strapi.db
      .query("api::business-partner-contact.business-partner-contact")
      .findMany({
        where: { business_partner_company: id },
        select: ["id"],
      });

    for (const contact of bpContacts) {
      await strapi.db
        .query("api::business-partner-contact.business-partner-contact")
        .delete({ where: { id: contact.id } });
    }
  },
  async afterCreate(event) {
    const { result, params } = event;
    if (params.data.bp_id) {
      try {
        const bpExtension = await strapi.db
          .query("api::business-partner-extension.business-partner-extension")
          .findOne({
            where: { bp_id: params.data.bp_id },
          });

        if (!bpExtension) {
          await strapi
            .query("api::business-partner-extension.business-partner-extension")
            .create({
              data: {
                bp_id: params.data.bp_id,
                locale: result.locale,
              },
            });
        }
      } catch (error) {
        console.error("Error in afterCreate:", error);
      }
    }
  },
  async afterUpdate(event) {
    const { result, params } = event;
    if (params.data.bp_id) {
      try {
        const bpExtension = await strapi.db
          .query("api::business-partner-extension.business-partner-extension")
          .findOne({
            where: { bp_id: params.data.bp_id },
          });

        if (!bpExtension) {
          await strapi
            .query("api::business-partner-extension.business-partner-extension")
            .create({
              data: {
                bp_id: params.data.bp_id,
                locale: result.locale,
              },
            });
        }
      } catch (error) {
        console.error("Error in afterUpdate:", error);
      }
    }
  },
};
