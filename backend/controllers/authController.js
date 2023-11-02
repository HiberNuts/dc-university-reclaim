require('dotenv').config()
const config = process.env;
const db = require("../models");
const User = db.user;
const Role = db.role;
const Token = db.userToken;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendmailTransport = require('nodemailer-sendmail-transport');
const crypto = require("crypto")

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
      walletAddress: req.body?.walletAddress,
      displayName: req.body?.displayName
    });

    await user.save();

    let roles;
    if (req.body.roles) {
      roles = await Role.find({ name: { $in: req.body.roles } });
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      roles = [defaultRole];
    }

    user.roles = roles.map(role => role._id);
    await user.save();

    let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    await token.save();

    // send mail with defined transport object
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAILID,
        pass: process.env.EMAILPASSWORD
      }
    });

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
        console.log('verification mail sent');
      }
    });

    res.status(200).send({ ...user, message: "User was registered successfully! Check verification mail" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};


exports.signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).populate("roles", "-__v");
    console.log(req.body.email, user?.email);

    if (!user) {
      await exports.signup(req, res);
      console.log("new user");
      return
    }

    if (!user.isVerified) {
      let token = await Token.findOne({ _userId: user._id });

      if (!token) {
        console.log("token expired");
        return res.status(401).send({ type: 'token-expired', message: 'Ask for sending verification mail again' });
      }

      // send mail with defined transport object
      // let transporter = nodemailer.createTransport({
      //   service: 'Sendgrid',
      //   auth: {
      //     user: process.env.EMAILID,
      //     pass: process.env.EMAILPASSWORD
      //   }
      // });
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAILID,
          pass: process.env.EMAILPASSWORD
        }
      });

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
          console.log('verification mail sent');
        }
      });

      return res.status(401).send({ type: 'not-verified', message: 'Your account has not been verified.' });
    }

    const jwtToken = jwt.sign({ id: user.id },
      config.SECRET,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400 // 24 hours
      });

    const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: jwtToken
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};


exports.confirmation = async (req, res) => {
  try {
    const tokenQuery = req.query.token;
    const token = await Token.findOne({ token: tokenQuery });

    if (!token) {
      res.status(400).send({ type: 'not-verified', message: 'We were unable to find a valid token. Your token my have expired.' });
    }

    const user = await User.findOne({ _id: token._userId });
    if (!user) {
      return res.status(400).send({ message: 'We were unable to find a user for this token.' });
    }

    if (user.isVerified) {
      return res.status(400).send({ type: 'already-verified', message: 'This user has already been verified.' });
    }

    user.isVerified = true;
    await user.save();
    return res.status(200).send({ type: "account-verified", message: "This account has been verified successfully. Please log in" });

  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }

}

exports.resend = async (req, res) => {
  try {
    const userIdQuery = req.query.userid;
    const user = await User.findOne({ _id: userIdQuery });

    let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    await token.save();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAILID,
        pass: process.env.EMAILPASSWORD
      }
    });

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
        console.log('verification mail sent');
      }
    });

    res.status(200).send({ ...user, message: "Sent verification mail again" });

  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
}