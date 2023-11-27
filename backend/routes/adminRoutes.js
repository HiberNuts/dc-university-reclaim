const controller = require("../controllers/adminController");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
      });
    
    app.post("/api/admin/login", controller.login);
    app.post("/api/admin/register", controller.register);
    app.get("/api/admin/getAdmin", controller.getAdmin);
    app.delete("/api/admin/deleteAdmin", controller.deleteAdmin);
};