module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
    // config: {
    //   provider: "strapi-provider-upload-do",
    //   providerOptions: {
    //     key: env("DO_SPACE_ACCESS_KEY"),
    //     secret: env("DO_SPACE_SECRET_KEY"),
    //     endpoint: env("DO_SPACE_ENDPOINT"),
    //     space: env("DO_SPACE_BUCKET"),
    //     directory: env("DO_SPACE_DIRECTORY"),
    //     cdn: env("DO_SPACE_CDN"),
    //   },
    // },
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
