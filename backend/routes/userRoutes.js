const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/user/allxyz", controller.getAllUser);
  app.get("/api/user/:shardId", controller.getUserData);

  app.post("/api/user/courseEnrolled", [authJwt.verifyToken], controller.courseEnrolled);

  app.post("/api/user/progress", [authJwt.verifyToken], controller.userProgress);
  app.put("/api/user/updateProgress", [authJwt.verifyToken], controller.updateCourseProgress);
  app.post("/api/user/progressPercentage", [authJwt.verifyToken], controller.userCourseProgressPercentage);
  app.post("/api/user/mintNft", [authJwt.verifyToken], controller.mintNft);
  app.post("/api/user/deleteImage", controller.deleteImage);
};
