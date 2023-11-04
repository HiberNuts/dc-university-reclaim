const mongoose = require("mongoose");

const UserTokenSchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});

module.exports = userTokens = mongoose.model("userTokens", UserTokenSchema);
