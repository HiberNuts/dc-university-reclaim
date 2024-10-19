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
const { recoverMessageAddress } = require('viem')

let defaultClient = brevo.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = config.BREVO_API_KEY;

let apiContactsInstance = new brevo.ContactsApi();
let createContact = new brevo.CreateContact();

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

// let transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "ramakrishnanrahul003@gmail.com",
//     pass: config.BREVO_KEY,
//   },
// });

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
    // console.log("!")
    // const recoveredAddress = await recoverMessageAddress({
    //   message: "Sign in to Shardeum university",
    //   signature: req.body.signature,
    // })
    let user = await User.findOne({
      walletAddress: req.body.walletAddress,
    }).populate("roles", "-__v");

    // if (!recoveredAddress) {
    //   return res.status(401).send({
    //     type: "user-blocked",
    //     message: "user is blocked, cannot sign in",
    //     user,
    //   });
    // }

    // if (recoveredAddress !== req.body.walletAddress) {
    //   return res.status(401).send({
    //     type: "user-blocked",
    //     message: "user is blocked, cannot sign in",
    //     user,
    //   });

    // }



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
      msg_type = "new-user";
      return;
    }

    if (user.isBlocked) {
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

    //JOIN NEWSLETTER CONFIG 
    const email = req.body.email;
    createContact.email = email;
    createContact.listIds = [346];

    // const userIdQuery = req.query.userid;
    const userIdQuery = req.userId;
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

    apiContactsInstance.createContact(createContact).then(function (data) {
    }, function (error) {
      if (JSON.parse(error?.response?.text).code === "duplicate_parameter") {
      } else {
        console.log('Error in sedning mail');

      }
    });

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

    const userIdQuery = req.userId;
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
    console.log(error);
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
    const userIdQuery = req.userId;
    const user = await User.findOne({ _id: userIdQuery });
    let token = await Token.findOne({ __userId: user._id });
    if (!token) {
      token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      await token.save();
    }

    // sendSmtpEmail.subject = "{{params.subject}}";
    sendSmtpEmail.sender = {
      name: "Shardeum University",
      email: "university@shardeum.org",
    };
    sendSmtpEmail.to = [{ email: user.email, name: user.username }];
    sendSmtpEmail.replyTo = { email: "university@shardeum.org", name: "Shardeum University" };
    sendSmtpEmail.templateId = 284;
    sendSmtpEmail.params = {
      emailverification: `http://${req.headers.host}/api/auth/confirmation?token=${token.token}`,
      username: user.username,
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        res.status(200).send({ message: "Sent verification mail again" });
      },
      function (error) {
        console.log("Error while sending verification email", userIdQuery)
        res.status(500).send({ message: "Error while sending verification email" });
      }
    );


  } catch (error) {
    console.error(error)
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
    if (blockStatus) {
      user.isBlocked = blockStatus === "true";
    } else {
      user.isBlocked = user.isBlocked ? false : true;
    }
    await user.save();

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

exports.updateuser = async (req, res) => {
  try {
    if (req.body?.shardId) {
      const shardId = await User.find({ shardId: req.body.shardId, _id: { $ne: req.userId } })
      if (req.body.shardId && shardId.length) {
        return res
          .status(200)
          .send({ message: "ShardID already exists!!", error: true });
      }
    }
    await User.updateOne({ _id: req.body.id }, { $set: { ...req.body } })
    const updatedUser = await User.findOne({ _id: req.body.id })
    return res.status(200).send({ error: false, user: updatedUser })
  }
  catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Internal Server Error", error });
  }
}
