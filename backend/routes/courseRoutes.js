const controller = require("../controllers/courseController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });
  
  app.get("/api/course/allCourses/pagination", controller.getAllCoursesWithPagination);
  app.get("/api/course/allCourses", controller.getAllCourses);
  app.get("/api/course/allCoursesDash", controller.getAllCoursesDash);
  app.get("/api/course/syncData", controller.syncData);
  app.get("/api/course/getCourse", controller.getCourseById);
  app.get("/api/course/getCourse/:title", controller.getCourseByName);
  app.delete("/api/course/getCourse", controller.deleteCourseById);
  app.get("/api/course/softDelete", controller.softDelete);
  app.post("/api/webhook/course/create", controller.createModel);
  app.post("/api/webhook/course/update", controller.updateModel);

};
