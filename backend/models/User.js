const mongoose = require("mongoose");


const chapterSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
  },
  status: {
    type: String,
    enum: ['none', 'partial', 'full'],
    default: 'none'
  },
  strapiId: Number
});

const quizSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
  }, 
  status: {
    type: String,
    enum: ['none', 'partial', 'full'],
    default: 'none'
  },
  answer: {
    type: String,
    enum: ['a', 'b', 'c', 'd']
  },
  strapiId: Number
});

const moduleSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  },
  status: {
    type: String,
    enum: ['none', 'partial', 'full'],
    default: 'none'
  },
  chapters: [chapterSchema],
  quizzes: [quizSchema],
  strapiId: Number
});

const enrolledCourseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  modules: [moduleSchema]
});


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      default: "default"
    },
    walletAddress: {
      type: String,
      required: true,
      default: "abc123"
    },
    email: {
      type: String,
      required: false,
      default: "default"
    },
    isVerified: { 
      type: Boolean,
      default: false 
    },
    isBlocked: { 
      type: Boolean,
      default: false 
    },
    displayName: {
      type: String,
      required: true,
      default: "default"
    },
    enrolledCourses: [enrolledCourseSchema],
    portfolio: {
      type: String,
      required: true,
      default: "https://sample.com/link"
    },
    designation: {
      type: String,
      required: true,
      default: "developer"
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
 