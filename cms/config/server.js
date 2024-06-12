module.exports = ({ env }) => ({
  host: env('HOST', '127.0.0.1'),
  port: 1337,
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
