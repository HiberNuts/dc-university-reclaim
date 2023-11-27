const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.userToken = require("./UserToken")
db.role = require("./Role");
db.course = require("./Course");
db.admin = require("./Admin");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;