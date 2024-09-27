const db = require("../models");
const Admin = db.admin;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configurations
const JWT_SECRET = process.env.SECRET;

// Admin Registration
exports.register = async (req, res) => {
    try {

        const { adminEmail, password } = req.body;

        if (!adminEmail || !password) {
            return res.status(400).send("Email and password are required.");
        }

        const existingAdmin = await Admin.findOne({ adminEmail });
        if (existingAdmin) {
            return res.status(409).send("Admin already exists with this email.");
        }

        const admin = new Admin({ adminEmail, password });
        await admin.save();

        res.status(201).send("Admin registered successfully.");
    } catch (error) {
        res.status(500).send("Error in registration.");
    }
};

// Admin Login
exports.login = async (req, res) => {
    try {
        const { adminEmail, password } = req.body;
        if (!adminEmail || !password) {
            return res.status(400).send("Email and password are required.");
        }

        const admin = await Admin.findOne({ adminEmail });


        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).send("Invalid email or password.");
        }

        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Logged in successfully", token: token });
    } catch (error) {
        res.status(500).send("Error in login.");
    }
};

//Get Admin
exports.getAdmin = async (req, res) => {
    try {

        const admins = await Admin.find({}).select('adminEmail -_id');

        if (admins.length === 0) {
            return res.status(404).send("No admins found.");
        }

        const adminEmails = admins.map(admin => admin.adminEmail);

        res.status(200).json({ adminEmails });
    } catch (error) {
        res.status(500).send("Error retrieving admins: " + error.message);
    }
};

// Delete Admin
exports.deleteAdmin = async (req, res) => {
    try {
        const { adminEmail } = req.body;

        if (!adminEmail) {
            return res.status(400).send("Admin email is required for deletion.");
        }

        const admin = await Admin.findOne({ adminEmail });

        if (!admin) {
            return res.status(404).send("Admin not found.");
        }

        await Admin.deleteOne({ adminEmail });

        res.status(200).send("Admin deleted successfully.");
    } catch (error) {
        res.status(500).send("Error in deleting admin: " + error.message);
    }
};

