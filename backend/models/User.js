const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
  },
  status: {
    type: String,
    enum: ["none", "partial", "full"],
    default: "none",
  },
  strapiId: Number,
});

const quizSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
  },
  status: {
    type: String,
    enum: ["none", "partial", "full"],
    default: "none",
  },
  answer: {
    type: String,
    enum: ["a", "b", "c", "d"],
  },
  strapiId: Number,
});

const testResultSchema = new mongoose.Schema({
  passed: { type: Boolean },
  description: { type: String },
  error: { type: String }
})

const programSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
  },
  status: {
    type: String,
    enum: ["none", "partial", "full"],
    default: "none",
  },
  strapiId: Number,
  code: { type: String },
  rank: { type: Number, default: -1 },
  amountEarned: { type: String },
  xp: { type: Number },
  walletAddress: { type: String },
  passedCases: { type: Number },
  totalCases: { type: Number },
  testResults: { type: [testResultSchema] },
  submittedTime: { type: Date },
  submittedCode: { type: String },
})

const moduleSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
  },
  status: {
    type: String,
    enum: ["none", "partial", "full"],
    default: "none",
  },
  chapterStatus: {
    type: String,
    enum: ["none", "partial", "full"],
    default: "none",
  },
  quizStatus: {
    type: String,
    enum: ["none", "partial", "full"],
    default: "none",
  },
  programStatus: {
    type: String,
    enum: ["none", "partial", "full"],
    default: "none",
  },
  chapters: [chapterSchema],
  quizzes: [quizSchema],
  program: programSchema,
  strapiId: Number,
});

const enrolledCourseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  courseCompleted: {
    type: Boolean,
    default: false,
  },
  nftStatus: {
    type: Boolean,
    default: false,
  },
  nftTxHash: {
    type: String,
    default: "",
  },
  modules: [moduleSchema],
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      default: "default",
    },
    walletAddress: {
      type: String,
      required: true,
      default: "abc123",
    },
    email: {
      type: String,
      required: false,
      default: "default",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    displayName: {
      type: String,
      required: true,
      default: "default",
    },
    enrolledCourses: [enrolledCourseSchema],
    portfolio: {
      type: String,
      required: true,
      default: "https://sample.com/link",
    },
    shardId: {
      type: String,
      default: ''
    },
    designation: {
      type: String,
      required: true,
      default: "developer",
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    image: {
      type: String
    },
    description: {
      type: String
    },
    occupation: {
      type: String,

    },
    experience: {
      type: String,
    },
    twitter: {
      type: String
    },
    linkedIn: {
      type: String
    },
    youtube: {
      type: String
    },
    github: {
      type: String
    },
    discord: {
      type: String
    },
    projects: {
      type: Array
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
