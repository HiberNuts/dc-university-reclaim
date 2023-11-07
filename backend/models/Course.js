const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  quizTitle: String,
  a: String,
  b: String,
  c: String,
  d: String,
  answer: String,
});

const chapterSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const moduleSchema = new mongoose.Schema({
  chapter: [chapterSchema],
  quizzes: [quizSchema],
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
  whatYouLearn: [String],
  faq: [
    {
      faqTitle: String,
      faqAnswer: String,
    },
  ],
  module: [moduleSchema],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
