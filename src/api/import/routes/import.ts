module.exports = {
  routes: [
    {
      method: "POST",
      path: "/import/fg-control-mains",
      handler: "import.fgControlMains",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/import/fg-customer-businesses",
      handler: "import.fgCustomerBusinesses",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/import/fg-product-businesses",
      handler: "import.fgProductBusinesses",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/import/fg-relationships",
      handler: "import.fgRelationships",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/import/product",
      handler: "import.product",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/import/product-media",
      handler: "import.productMedia",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/import/product-suggestion",
      handler: "import.productSuggestion",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/import/sales-call",
      handler: "import.salesCall",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/import/contact",
      handler: "import.contact",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
