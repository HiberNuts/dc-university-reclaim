require("dotenv").config();
const config = process.env;
const db = require("../models");
const User = db.user;
const Role = db.role;
const Token = db.userToken;
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const brevo = require("@getbrevo/brevo");
let defaultClient = brevo.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = config.BREVO_API_KEY;

let apiInstance = new brevo.TransactionalEmailsApi();
let sendSmtpEmail = new brevo.SendSmtpEmail();

// create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: config.EMAILID,
//     pass: config.EMAILPASSWORD,
//   },
// });

let transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "ramakrishnanrahul003@gmail.com",
    pass: config.BREVO_KEY,
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

    let token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    await token.save();

    const jwtToken = jwt.sign({ id: user.id }, config.SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      type: "user-registered",
      ...user._doc,
      accessToken: jwtToken,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Internal Server Error", error });
  }
};

exports.signin = async (req, res) => {
  try {
    let user = await User.findOne({
      walletAddress: req.body.walletAddress,
    }).populate("roles", "-__v");
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

    if (user.isBlocked) {
      console.log("user is blocked");
      return res.status(401).send({
        type: "user-blocked",
        message: "user is blocked, cannot sign in",
        user,
      });
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

    // const authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());
    res.status(200).send({
      type: msg_type,
      ...user._doc,
      accessToken: jwtToken,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Internal Server Error", error });
  }
};

exports.update = async (req, res) => {
  try {
    const userIdQuery = req.query.userid;
    let user = await User.findOne({ _id: userIdQuery }).populate(
      "roles",
      "-__v"
    );

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

    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    res.status(200).send({
      type: "updated-user",
      ...user._doc,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Internal Server Error", error });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const userIdQuery = req.query.userid;
    const user = await User.findOne({ _id: userIdQuery }).populate(
      "roles",
      "-__v"
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    res.status(200).send({
      type: "user-data",
      ...user._doc,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Internal Server Error", error });
  }
};

exports.confirmation = async (req, res) => {
  try {
    const tokenQuery = req.query.token;
    const token = await Token.findOne({ token: tokenQuery });

    if (!token) {
      res.status(400).send({
        type: "not-verified",
        message:
          "We were unable to find a valid token. Your token my have expired.",
      });
    }

    const user = await User.findOne({ _id: token._userId });
    if (!user) {
      return res
        .status(400)
        .send({ message: "We were unable to find a user for this token." });
    }

    if (user.isVerified) {
      // Redirect URL after successful verification
      const redirectURL = config.FRONT_END_URL + "emailverification"; // Change this to your desired URL

      return res.status(200).send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="5;url=${redirectURL}">
      </head>
      <body>
        <p>Your account has been verified successfully. You will be redirected to the login page in a few seconds.</p>
        <script>
          setTimeout(function() {
            window.location.href = "${redirectURL}";
          }, 5000); // Redirect after 5 seconds
        </script>
      </body>
    </html>
  `);
    }

    user.isVerified = true;
    await user.save();
    // Redirect URL after successful verification
    const redirectURL = config.FRONT_END_URL + "emailverification"; // Change this to your desired URL

    res.status(200).send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="5;url=${redirectURL}">
      </head>
      <body>
        <p>Your account has been verified successfully. You will be redirected to the login page in a few seconds.</p>
        <script>
          setTimeout(function() {
            window.location.href = "${redirectURL}";
          }, 2000); // Redirect after 2 seconds
        </script>
      </body>
    </html>
  `);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Internal Server Error", error });
  }
};

exports.resend = async (req, res) => {
  try {
    const userIdQuery = req.query.userId;
    const user = await User.findOne({ _id: userIdQuery });
    console.log(userIdQuery);

    let token = await Token.findOne({ __userId: user._id });
    if (!token) {
      token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      await token.save();
    }
    console.log(user.email);

    sendSmtpEmail.subject = "{{params.subject}}";
    // sendSmtpEmail.htmlContent =
    //   "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
    sendSmtpEmail.sender = {
      name: "Shardeum Academy",
      email: "no-reply@shardeum.com",
    };
    sendSmtpEmail.to = [{ email: user.email, name: user.name }];
    sendSmtpEmail.replyTo = { email: config.EMAILID, name: "sample-name" };
    // sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.templateId = 2;
    sendSmtpEmail.params = {
      // parameter: "My param value",
      subject: "Email Verification",
      link: `http://${req.headers.host}/api/auth/confirmation?token=${token.token}`,
      name: user.name,
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data)
        );
      },
      function (error) {
        console.error(error);
      }
    );

    res.status(200).send({ message: "Sent verification mail again" });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Internal Server Error", error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userIdQuery = req.query.userId;
    const user = await User.findOne({ _id: userIdQuery }).populate(
      "roles",
      "-__v"
    );

    console.log(user);

    res.status(200).send(user);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Internal Server Error", error });
  }
};

exports.toggleBlock = async (req, res) => {
  try {
    const userIdQuery = req.query.userId;
    const blockStatus = req.query?.blockStatus;

    const user = await User.findOne({ _id: userIdQuery }).populate(
      "roles",
      "-__v"
    );

    console.log(user.isBlocked, "before");

    if (blockStatus) {
      user.isBlocked = blockStatus === "true";
    } else {
      user.isBlocked = user.isBlocked ? false : true;
    }
    await user.save();

    console.log(user.isBlocked, "after");

    res.status(200).send({
      message: `user's block status is ${user.isBlocked}`,
      isBlocked: user.isBlocked,
      user: user._doc,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Internal Server Error", error });
  }
};
