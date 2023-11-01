const mongoose = require("mongoose");

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
      default: "default"
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
    coursesEnrolled: {
      type: Object,
      required: true,
      default: []
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
