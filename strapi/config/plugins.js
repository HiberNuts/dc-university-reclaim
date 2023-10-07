module.exports = ({ env }) => ({
  //...
  "import-export-entries": {
    enabled: true,
  },
  "custom-api": {
    enabled: true,
  },
  
  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 5, // Default is 5
    }
  },
  //...
});
