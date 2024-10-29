const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/authController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/confirmation", controller.confirmation);
  app.post("/api/auth/resend", [authJwt.verifyToken], controller.resend);
  app.put("/api/auth/update", [authJwt.verifyToken], controller.update);
  app.get("/api/auth/getUserData", [authJwt.verifyToken], controller.getUserData)
  app.get("/api/auth/user", controller.getUser);
  app.post("/api/auth/toggleBlock", controller.toggleBlock);
  app.post("/api/auth/updateuser", [authJwt.verifyToken], controller.updateuser);
};