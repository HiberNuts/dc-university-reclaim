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
  }
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
  }
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
  quizzes: [quizSchema]
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

module.exports = users = mongoose.model("users", userSchema);
