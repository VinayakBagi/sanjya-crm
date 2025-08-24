/**
 * configuration custom router
 */

export default {
  routes: [
    {
      method: "POST",
      path: "/business-partner/registration",
      handler: "business-partner.registration",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/business-partner/:documentId/save",
      handler: "business-partner.save",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
