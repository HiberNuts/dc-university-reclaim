const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  quizTitle: String,
  a: String,
  b: String,
  c: String,
  d: String,
  answer: String,
  strapiId: Number,
});

const chapterSchema = new mongoose.Schema({
  title: String,
  content: String,
  strapiId: Number,
});

const moduleSchema = new mongoose.Schema({
  moduleTitle: String,
  chapter: [chapterSchema],
  quizzes: [quizSchema],
  strapiId: Number,
});

const courseSchema = new mongoose.Schema({
  strapiId: Number,
  title: String,
  description: String,
  aboutCourse: String,
  duration: Number,
  level: String,
  skills: [String],
  nftImage: String,
  banner: String,
  whatYouLearn: [String],
  faq: [
    {
      faqTitle: String,
      faqAnswer: String,
    },
  ],
  module: [moduleSchema],
  usersEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  softDelete: {
    type: Boolean,
    default: false,
  },
  contractAddress: String,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
