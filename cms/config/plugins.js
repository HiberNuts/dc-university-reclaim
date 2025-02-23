module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-do",
      providerOptions: {
        key: env("DO_SPACE_ACCESS_KEY"),
        secret: env("DO_SPACE_SECRET_KEY"),
        endpoint: env("DO_SPACE_ENDPOINT"),
        space: env("DO_SPACE_BUCKET"),
        // directory: env("DO_SPACE_DIRECTORY"),
        cdn: env("DO_SPACE_CDN"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      parser: {
        "enabled": true,
        "multipart": true,
        "formidable": {
          "maxFileSize": 52428800
        }
      }
    },
  },
  ckeditor: {
    enabled: true,
    config: {
      editor: {
        mediaEmbed: {
          previewsInData: true,
        },
      },
    },
  },
});

// config: {
//   provider: "cloudinary",
//   providerOptions: {
//     cloud_name: env("CLOUDINARY_NAME"),
//     api_key: env("CLOUDINARY_KEY"),
//     api_secret: env("CLOUDINARY_SECRET"),
//   },
//   actionOptions: {
//     upload: {},
//     uploadStream: {},
//     delete: {},
//   },
// },
