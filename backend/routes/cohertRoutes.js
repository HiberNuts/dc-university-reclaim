const { authJwt } = require("../middlewares");
const controller = require("../controllers/cohertsController");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/webhook/coherts/create", controller.createCohert)
    app.post("/api/webhook/coherts/update", controller.updateCohert)

};   
