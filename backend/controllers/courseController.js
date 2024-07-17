require("dotenv").config();

const db = require("../models");
const User = require("../models/User");
const { fetchCoursesFromCMS, processCourse, createNewEnrollment } = require("./helper.courseController");
const Course = db.course;

exports.getAllCoursesWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const totalItems = await Course.countDocuments();

    const courses = await Course.find({}, { contractAddress: 0, usersEnrolled: 0, softDelete: false })
      .skip((page - 1) * limit)
      .limit(limit);
    if (courses.length === 0) {
      return res.status(404).send({ message: "No courses found" });
    }
    res.status(200).send({
      message: "Retrieved successfully",
      courses,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
}

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}, { contractAddress: 0, usersEnrolled: 0 });
    res.status(200).send({ message: "retrieved successfully", courses });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.getAllCoursesDash = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send({ message: "retrieved successfully", courses });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.courseEnrolled = async (req, res) => {
  const { courseId } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }

    const enrolledCourseIndex = user.enrolledCourses.findIndex(
      (course) => String(course.courseId) === courseId
    );

    if (enrolledCourseIndex !== -1) {
      await updateExistingEnrollment(user, course, enrolledCourseIndex);
      return res.status(200).send({
        message: "User enrollment updated successfully",
      });
    } else {
      await createNewEnrollment(user, course);
      return res.status(200).send({
        message: "User enrolled in the course successfully",
        courseId: courseId,
      });
    }
  } catch (error) {
    console.error("Error in course enrollment:", error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};


exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.query.courseId }, {
      contractAddress: 0
    })

    res.status(200).send({ message: "retrieved successfully", course });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.getCourseByName = async (req, res) => {
  try {
    const course = await Course.findOne({ title: req.params.title }, {
      contractAddress: 0, usersEnrolled: 0
    })

    res.status(200).send({ message: "retrieved successfully", course });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.deleteCourseById = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete({ _id: req.query.id });
    res.status(200).send({ message: "Successfully Deleted", course });
  } catch (error) {
    console.log("error in deleting course", error);
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.syncData = async (req, res) => {
  try {
    const coursesData = await fetchCoursesFromCMS();
    await Promise.all(coursesData.map(processCourse));
    res.status(200).send({ message: "Course data synchronized successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.softDelete = async (req, res) => {
  try {
    const courseData = await Course.findOne({ _id: req.query.courseId });
    if (courseData) {
      const newSoftDeleteStatus = !courseData.softDelete;
      courseData.softDelete = newSoftDeleteStatus;

      await courseData.save();
      res.status(200).send({
        message: "Soft delete successful",
        newSoftDeleteStatus: newSoftDeleteStatus,
      });
    } else {
      res.status(400).send({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};
