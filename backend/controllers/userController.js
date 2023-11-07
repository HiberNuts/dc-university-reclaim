require("dotenv").config();
const config = process.env;
const db = require("../models");
const Course = db.course;
const User = db.user;
const Role = db.role;
const Token = db.userToken;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.courseEnrolled = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if the course is already enrolled by the user
    const enrolledCourse = user.enrolledCourses.find(course => String(course.courseId) === courseId);
    console.log(enrolledCourse);
    if (enrolledCourse) {
      return res.status(400).send({ message: 'User is already enrolled in this course' });
    }

    let course = await Course.findOne({ _id: courseId });
    // console.log(course.module)

    let userEnrolledCourse = {};
    userEnrolledCourse.courseId = courseId;

    userEnrolledCourse.modules = course.module.map((module) => {
      let res = {};
      res._id = module._id;
      // res.status = 
      res.chapters = module.chapter.map((chapter) => {
        return { _id: chapter._id };
      });
      console.log(module.quizzes)
      res.quizzes = module.quizzes.map((quiz) => {
        return { _id: quiz._id, answer: quiz.answer };
      });
      return res;
    })
    console.log(userEnrolledCourse.modules);

    // // Enroll the user in the course
    user.enrolledCourses.push(userEnrolledCourse);
    await user.save();

    res.status(200).send({ message: 'User enrolled in the course successfully', courseId: courseId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

exports.userProgress = async (req, res) => {
  try {
    const userId = req.body.userId;
    const courseId = req.body?.courseId;

    let user = await User.findOne({ _id: userId });

    if (courseId) {
      const enrolledCourse = user.enrolledCourses.find(course => String(course.courseId) === courseId);
      // console.log(enrolledCourse);

      res.status(200).send({ message: "course progress retrieved", enrolledCourse });
    }
    else {
      res.status(200).send({ message: "user's entire courses and their progress", enrolledCourses: user.enrolledCourses });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
}

exports.updateCourseProgress = async (req, res) => {
  try {
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    const updatedEnrolledCourse = req.body.updatedEnrolledCourse;

    let user = await User.findOne({ _id: userId });

    const enrolledCourseIndex = user.enrolledCourses.findIndex(course => String(course.courseId) === courseId);
    console.log(enrolledCourseIndex);

    if (enrolledCourseIndex !== -1) {
      user.enrolledCourses[enrolledCourseIndex] = updatedEnrolledCourse;
      await user.save();
      res.status(200).send({
        message: "Course progress updated successfully",
        updatedProgress: user.enrolledCourses[enrolledCourseIndex]
      });
    } else {
      res.status(404).send({ message: "Enrolled course not found" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
}