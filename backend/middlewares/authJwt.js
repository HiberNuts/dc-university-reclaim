const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;
const db = require("../models");
const User = db.user;
const Role = db.role;

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    if (!token.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Invalid token format!" });
    }

    token = token.replace(/^Bearer\s+/, '').trim();

    const decoded = jwt.verify(token, config.SECRET, { algorithms: ['HS256'] });
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log("Token error", err)
    res.status(401).send({ message: "Unauthorized!", errorMessage: err.message });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    if (roles.some((role) => role.name === "admin")) {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Internal Server Error" });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    if (roles.some((role) => role.name === "moderator")) {
      next();
    } else {
      res.status(403).send({ message: "Require Moderator Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Internal Server Error" });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

module.exports = authJwt;
