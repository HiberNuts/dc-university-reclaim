const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;
const db = require("../models");
const User = db.user;
const Role = db.role;
const Admin = db.admin;

// Configurations
const JWT_SECRET = process.env.SECRET;

const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if authorization header is present and formatted as "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).send("Access denied. No token provided.");
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the admin exists in the database
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).send("Admin not found.");
    }

    // Attach admin details to the request object for use in the next middleware or route
    req.admin = admin;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).send("Invalid or expired token.");
  }
};

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


const authJwt = {
  verifyToken,
  verifyAdmin
};

module.exports = authJwt;
