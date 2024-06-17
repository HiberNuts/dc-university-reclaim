const { authJwt } =require("../middlewares");
const controller=require("../controllers/contestController")

module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
      next();
    });
    //CONTESTS
    app.get("/api/contest/latest",controller.getLatestContest);
    app.get("/api/contest/upcoming/:limit",controller.getUpcomingContests);
    app.get("/api/contest/getPastContests",controller.getPastContests);
    app.get("/api/contest/allContests",controller.getAllContests);
    app.post("/api/contest/getContest",controller.getContestByID);
    app.get("/api/contest/getContest/:title",controller.getContestByTitle);
    //PROGRAM 
    app.post("/api/program/getProgram",[authJwt.verifyToken],controller.getProgram);
    // COMPILER 
    app.post("/api/compile", controller.compiler);
    app.post("/api/contest/register",[authJwt.verifyToken],controller.createSubmission);
    app.post("/api/contest/alreadyRegistered",[authJwt.verifyToken],controller.alreadyRegistered);
    // WEBHOOKS 
    app.post("/api/webhook/contest/create",controller.createModel);
    app.post("/api/webhook/contest/update",controller.updateModel);
  };
