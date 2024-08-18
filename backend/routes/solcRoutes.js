
const controller = require("../controllers/solcController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/compile", controller.compiler);
  app.post('/api/test', controller.compiler, controller.test);

};
