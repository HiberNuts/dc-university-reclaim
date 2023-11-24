require("dotenv").config();
const config = process.env;
const axios = require("axios");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const db = require("../models");
const Course = db.course;

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send({ message: "retrieved successfully", courses });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.query.courseId });
    res.status(200).send({ message: "retrieved successfully", course });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.getCourseByName = async (req, res) => {
  try {
    const course = await Course.findOne({ title: req.params.title });
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
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.syncData = async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${config.CMS_URL}/api/courses/?populate=deep`,
      headers: {
        Authorization: `Bearer ${config.STRAPI_TOKEN}`,
      },
    });
    const coursesData = response.data.data;

    for (const courseData of coursesData) {
      // Extract course details from courseData.attributes


      const existingCourse = await Course.findOne({ strapiId: courseData.id });
      const courseDetails = {
        strapiId: courseData.id,
        title: courseData.attributes.title,
        description: courseData.attributes.description,
        aboutCourse: courseData.attributes.aboutCourse,
        duration: courseData.attributes.duration,
        level: courseData.attributes.level,
        skills: courseData.attributes.skills,
        nftImage: courseData.attributes.nftImage,
        banner: courseData.attributes.banner.data[0]?.attributes?.url,
        whatYouLearn: courseData.attributes.whatYouLearn.map((item) => item.title),
        // Transform faq data
        faq: courseData.attributes.faq.map((faqItem) => ({
          faqTitle: faqItem.faqTitle,
          faqAnswer: faqItem.faqAnswer,
        })),
        // Transform module data
        module: courseData.attributes.module.map((moduleItem) => ({
          moduleTitle: moduleItem.moduleTitle,
          chapter: moduleItem.chapter.map((chapterItem) => ({
            title: chapterItem.title,
            content: chapterItem.content,
            strapiId: chapterItem.id,
          })),
          quizzes: moduleItem.quizes.map((quizItem) => ({
            quizTitle: quizItem.quizTitle,
            a: quizItem.a,
            b: quizItem.b,
            c: quizItem.c,
            d: quizItem.d,
            answer: quizItem.answer,
            strapiId: quizItem.id,
          })),
          strapiId: moduleItem.id,
        })),
      };

      if (existingCourse) {
        const updatedCourse = await Course.findOneAndUpdate(
          { strapiId: courseData.id },
          { $set: courseDetails },
          { new: true }
        );
        console.log("course updated:", updatedCourse._id);
        continue;
      }

      // Create a new Course document and save it to MongoDB
      const course = new Course(courseDetails);
      await course.save();
    }
    res.status(200).send({ message: "course data synchronized successfully" });
  } catch (error) {
    // console.error(error);
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
