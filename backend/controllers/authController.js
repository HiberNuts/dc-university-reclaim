require("dotenv").config();
const config = process.env;
const db = require("../models");
const User = db.user;
const Role = db.role;
const Token = db.userToken;
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAILID,
    pass: config.EMAILPASSWORD,
  },
});

exports.signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body?.username,
      email: req.body?.email,
      walletAddress: req.body.walletAddress,
      displayName: req.body?.displayName,
    });

    const newUserData = await user.save();

    let roles;
    if (req.body.roles) {
      roles = await Role.find({ name: { $in: req.body.roles } });
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      roles = [defaultRole];
    }

    const authorities = roles.map((role) => "ROLE_" + role.name.toUpperCase());
    user.roles = roles.map((role) => role._id);
    await user.save();

    console.log(user);

    let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString("hex") });
    await token.save();

    res.status(200).send({
      type: "user-registered",
      id: newUserData._id,
      username: newUserData.username,
      email: newUserData.email,
      isVerified: newUserData.isVerified,
      walletAddress: newUserData.walletAddress,
      roles: authorities,
      designation: newUserData.designation,
      portfolio: newUserData.portfolio,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.signin = async (req, res) => {
  try {
    let user = await User.findOne({ walletAddress: req.body.walletAddress }).populate("roles", "-__v");
    console.log(req.body.walletAddress, user?.walletAddress);

    /*
    * there are 4 valid msg_types for signin api request
    * 1) new-user   (action: mail is sent to them)
    * 2) not-verified   (action: wait for them to click on verify link on their mail)
    * 3) token-expired  (action: ask for resend verification mail)
    * 4) normal-login [default]  (action: its usual signin with JWT token)
    */

    let msg_type = "normal-login";
    if (!user) {
      await exports.signup(req, res);
      console.log("new user");
      msg_type = "new-user";
      return;
    }

    if (!user.isVerified) {
      let token = await Token.findOne({ _userId: user._id });
      msg_type = "not-verified";
      if (!token) {
        console.log("token expired");
        msg_type = "token-expired";
        // return res.status(401).send({ type: "token-expired", message: "Ask for sending verification mail again", user });
      }
    }

    const jwtToken = jwt.sign({ id: user.id }, config.SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    const authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());
    res.status(200).send({
      type: msg_type,
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
      roles: authorities,
      accessToken: jwtToken,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.update = async (req, res) => {
  try {
    const userIdQuery = req.query.userid;
    let user = await User.findOne({ _id: userIdQuery }).populate("roles", "-__v");

    for (let key in req.body) {
      if (key in user) {
        if (key === "roles") {
          const roleNames = req.body.roles;
          const roleIds = []; // Fetch and populate this array with role ObjectId values based on roleNames.
          user.roles = roleIds;
        } else {
          user[key] = req.body[key];
        }
      }
    }

    await user.save();

    const authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());

    res.status(200).send({
      type: "updated-user",
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
      walletAddress: user.walletAddress,
      roles: authorities,
      designation: user.designation,
      portfolio: user.portfolio,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
}


exports.getUserData = async (req, res) => {
  try {
    const userIdQuery = req.query.userid;
    const user = await User.findOne({ _id: userIdQuery }).populate("roles", "-__v");
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());

    res.status(200).send({
      type: "user-data",
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
      walletAddress: user.walletAddress,
      roles: authorities,
      designation: user.designation,
      portfolio: user.portfolio,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
}


exports.confirmation = async (req, res) => {
  try {
    const tokenQuery = req.query.token;
    const token = await Token.findOne({ token: tokenQuery });

    if (!token) {
      res
        .status(400)
        .send({ type: "not-verified", message: "We were unable to find a valid token. Your token my have expired." });
    }

    const user = await User.findOne({ _id: token._userId });
    if (!user) {
      return res.status(400).send({ message: "We were unable to find a user for this token." });
    }

    if (user.isVerified) {
      return res.status(400).send({ type: "already-verified", message: "This user has already been verified." });
    }

    user.isVerified = true;
    await user.save();
    return res
      .status(200)
      .send({ type: "account-verified", message: "This account has been verified successfully. Please log in" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.resend = async (req, res) => {
  try {
    const userIdQuery = req.query.userid;
    const user = await User.findOne({ _id: userIdQuery });

    let token = await Token.findOne({ __userId: user._id });
    if (!token) {
      token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString("hex") });
      await token.save();
    }
    console.log(user.email)

    let mailOptions = {
      from: process.env.EMAILID,
      to: user.email,
      subject: "Email Verification",
      html: `<p>Click <a href="http://${req.headers.host}/api/auth/confirmation?token=${token.token}">here</a> to verify your email address.</p>`,
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("verification mail sent");
      }
    });

    res.status(200).send({ ...user._doc, message: "Sent verification mail again" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
  
};
