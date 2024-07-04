const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");
const AWS = require("aws-sdk")
const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACE_ENDPOINT);
AWS.config.update({
  secretAccessKey:process.env.DO_SPACE_SECRET_KEY,
  accessKeyId:process.env.DO_SPACE_ACCESS_KEY,
})
const s3=new AWS.S3();
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

  app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

  app.get("/api/user/allxyz", controller.getAllUser);
  app.get("/api/user/:shardId", controller.getUserData);

  app.post("/api/user/courseEnrolled", [authJwt.verifyToken], controller.courseEnrolled);

  app.post("/api/user/progress", [authJwt.verifyToken], controller.userProgress);
  app.put("/api/user/updateProgress", [authJwt.verifyToken], controller.updateCourseProgress);
  app.post("/api/user/progressPercentage", [authJwt.verifyToken], controller.userCourseProgressPercentage);
  app.post("/api/user/mintNft", [authJwt.verifyToken], controller.mintNft);
  app.get("/api/user/newsletter", controller.joinNewsLetter);
  app.get("/deleteImage",  (req, res) => {
    const params = {
      Bucket: 'shardeum-university-storage',
      Key: "191ec67bfe3fb129c489fac1b5facc0c.png"
    };
  
     s3.deleteObject(params, function (err, data) {
      if (err) {
        res.send(err)
      } else {
        res.send(data);
      }
    })
  })
};
