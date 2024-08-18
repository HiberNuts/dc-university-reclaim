module.exports = [
  "strapi::errors",
  // {
  //   name: "strapi::security",
  //   config: {
  //     contentSecurityPolicy: {
  //       useDefaults: true,
  //       directives: {
  //         "connect-src": ["'self'", "https:"],
  //         "img-src": [
  //           "'self'",
  //           "data:",
  //           "blob:",
  //           "market-assets.strapi.io",
  //           "res.cloudinary.com",
  //         ],
  //         "media-src": [
  //           "'self'",
  //           "data:",
  //           "blob:",
  //           "market-assets.strapi.io",
  //           "res.cloudinary.com",
  //         ],
  //         upgradeInsecureRequests: null,
  //       },
  //     },
  //   },
  // },
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:",'http:'],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "*.digitaloceanspaces.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "*.digitaloceanspaces.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
