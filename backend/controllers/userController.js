require("dotenv").config();
const config = process.env;
const db = require("../models");
const Course = db.course;
const User = db.user;
const Role = db.role;
const Token = db.userToken;
const _ = require("lodash");
const brevo = require("@getbrevo/brevo");
const { MintPOLNft } = require("../dNFT/link");
const AWS = require("aws-sdk")
const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACE_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACE_ACCESS_KEY,
  secretAccessKey: process.env.DO_SPACE_SECRET_KEY,
});
let defaultClient = brevo.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = config.BREVO_API_KEY;

let apiInstance = new brevo.TransactionalEmailsApi();
let apiContactsInstance = new brevo.ContactsApi();
let createContact = new brevo.CreateContact();
let sendSmtpEmail = new brevo.SendSmtpEmail();

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getAllUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit; // Starting index for slicing
  const endIndex = page * limit;

  const totalUsers = await User.countDocuments({});
  const totalPages = Math.ceil(totalUsers / limit);

  const user = await User.find({}).limit(limit).skip(startIndex)

  res.json({ user, totalPages, currentPage: page, hasNextPage: endIndex < totalUsers })
};

exports.getUserData = async (req, res) => {
  try {
    const userData = await User.findOne({ shardId: req.params.shardId });
    res.status(200).send({ error: false, data: userData });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }

}

exports.joinNewsLetter = (req, res) => {
  try {
    const email = req.query.email;
    createContact.email = email;
    createContact.listIds = [183];

    apiContactsInstance.createContact(createContact).then(function (data) {
      console.log('API called successfully. user added to news Letter ' + JSON.stringify(data));
      res.status(200).send({ message: "Your email has been successfully added to our newsletter subscription list – welcome to the Shardeum community!" })
    }, function (error) {
      if (JSON.parse(error?.response?.text).code === "duplicate_parameter") {
        res.status(400).json({ message: "Looks like you're already subscribed – thanks for staying connected with Shardeum!" })
      } else {
        res.status(400).json(JSON.parse(error.response.text))
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" })
  }
}

exports.courseEnrolled = async (req, res) => {
  const { courseId } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the course is already enrolled by the user
    const enrolledCourseIndex = user.enrolledCourses.findIndex((course) => String(course.courseId) === courseId);
    if (enrolledCourseIndex !== -1) {
      const existingCourseProgress = user.enrolledCourses[enrolledCourseIndex];

      // retrieve new course data
      let newCourse = await Course.findOne({ _id: courseId });
      existingCourseProgress.modules.forEach((existingModule) => {
        const newModule = newCourse.module.find(
          (module) => String(module.strapiId) === String(existingModule.strapiId)
        );
        if (newModule) {
          existingModule.chapters.forEach((existingChapter) => {
            const newChapter = newModule.chapter.find(
              (chapter) => String(chapter.strapiId) === String(existingChapter.strapiId)
            );

            if (!newChapter) {
              // Remove the chapter from existingModule if it's not found in the newModule
              console.log(newChapter);
              existingModule.chapters = existingModule.chapters.filter(
                (chapter) => String(chapter.strapiId) !== String(existingChapter.strapiId)
              );
            }
          });

          newModule.chapter.forEach((existingChapter) => {
            const isNewChapter = !existingModule.chapters.some(
              (chapter) => String(chapter.strapiId) === String(existingChapter.strapiId)
            );
            // console.log(`Chapter ${existingChapter._id} is new: ${isNewChapter}`);

            if (isNewChapter) {
              // Handle addition of new chapter
              // ...
              // console.log(isNewChapter)
              existingModule.chapters.push({
                _id: existingChapter._id,
                strapiId: existingChapter.strapiId,
                status: "none",
              });
            }
          });

          // console.log((existingModule.quizzes).length, newModule.quizzes.length);

          // Compare quizzes within modules
          existingModule.quizzes.forEach((existingQuiz) => {
            const newQuiz = newModule.quizzes.find((quiz) => String(quiz.strapiId) === String(existingQuiz.strapiId));
            if (newQuiz) {
              // Compare quiz properties and update them if changed
              // For example:
              // existingQuiz.status = newQuiz.status;
              existingQuiz.answer = newQuiz.answer;
              // ...
            } else {
              // Remove the quiz from existingModule if it's not found in the newModule
              existingModule.quizzes = existingModule.quizzes.filter(
                (quiz) => String(quiz.strapiId) !== String(existingQuiz.strapiId)
              );
            }
          });

          newModule.quizzes.forEach((existingQuiz) => {
            const isNewQuiz = !existingModule.quizzes.some(
              (quiz) => String(quiz.strapiId) === String(existingQuiz.strapiId)
            );


            if (isNewQuiz) {

              existingModule.quizzes.push({
                _id: existingQuiz._id,
                strapiId: existingQuiz.strapiId,
                status: "none",
              });
            }
          });
        } else {

          existingCourseProgress.modules = existingCourseProgress.modules.filter(
            (module) => String(module.strapiId) !== String(existingModule.strapiId)
          );
        }
      });

      newCourse.module.forEach((newModule) => {
        const isModuleAlreadyExists = existingCourseProgress.modules.some(
          (existingModule) => String(existingModule.strapiId) === String(newModule.strapiId)
        );
        if (!isModuleAlreadyExists) {

          let res = {};
          res._id = newModule._id;
          res.strapiId = newModule.strapiId;
          res.chapters = newModule.chapter.map((chapter) => {
            return { _id: chapter._id, strapiId: chapter.strapiId };
          });
          res.quizzes = newModule.quizzes.map((quiz) => {
            return {
              _id: quiz._id,
              answer: quiz.answer,
              strapiId: quiz.strapiId,
            };
          });

          existingCourseProgress.modules.push(res);
        }
      });

      if (!newCourse.usersEnrolled.some((userId) => userId.equals(user._id))) {
        newCourse.usersEnrolled.push(user._id);

        await newCourse.save();
      } else {
        console.log("User already added in the course's usersEnrolled array");
      }

      return res.status(200).send({
        message: "User is already enrolled in this course but updated user-progress if there was change in Course",
      });
    }

    let course = await Course.findOne({ _id: courseId });

    if (!course.usersEnrolled.some((userId) => userId.equals(user._id))) {
      course.usersEnrolled.push(user._id);
      await course.save();
      console.log("User added to the course's usersEnrolled array");
    } else {
      console.log("User already added in the course's usersEnrolled array");
    }

    let userEnrolledCourse = {};
    userEnrolledCourse.courseId = courseId;

    userEnrolledCourse.modules = course.module.map((module) => {
      let res = {};
      res._id = module._id;
      res.strapiId = module.strapiId;

      res.chapters = module.chapter.map((chapter) => {
        return { _id: chapter._id, strapiId: chapter.strapiId };
      });
      res.quizzes = module.quizzes.map((quiz) => {
        return { _id: quiz._id, answer: quiz.answer, strapiId: quiz.strapiId };
      });
      return res;
    });

    user.enrolledCourses.push(userEnrolledCourse);
    await user.save();

    res.status(200).send({
      message: "User enrolled in the course successfully",
      courseId: courseId,
    });
  } catch (error) {
    console.error("Error while login", error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

exports.userProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.body?.courseId;

    let user = await User.findOne({ _id: userId });

    if (courseId) {
      const enrolledCourse = user.enrolledCourses.find((course) => String(course.courseId) === courseId);
      // console.log(enrolledCourse);

      res.status(200).send({ message: "course progress retrieved", enrolledCourse });
    } else {
      res.status(200).send({
        message: "user's entire courses and their progress",
        enrolledCourses: user.enrolledCourses,
      });
    }
  } catch (error) {
    console.error("Error while fetching user progress", error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

exports.updateCourseProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const updatedEnrolledCourse = req.body.updatedEnrolledCourse;

    let user = await User.findOne({ _id: userId });

    const enrolledCourseIndex = user.enrolledCourses.findIndex((course) => String(course.courseId) === courseId);

    if (enrolledCourseIndex !== -1) {
      user.enrolledCourses[enrolledCourseIndex] = updatedEnrolledCourse;
      const { overallCompletionPercentage } = await this.checkifUserCompletedCourse({ userId, courseId: courseId })
      if (overallCompletionPercentage >= 99.5 && user.enrolledCourses[enrolledCourseIndex].courseCompleted != true) {
        user.enrolledCourses[enrolledCourseIndex].courseCompleted = true
      }

      await user.save();
      res.status(200).send({
        message: "Course progress updated successfully",
        updatedProgress: user.enrolledCourses[enrolledCourseIndex],
      });
    } else {
      res.status(404).send({ message: "Enrolled course not found" });
    }
  } catch (error) {
    console.error("Error while updating user progress", error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

exports.userCourseProgressPercentage = async (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.body.courseId;

    let user = await User.findOne({ _id: userId });

    const enrolledCourseIndex = user.enrolledCourses.findIndex((course) => String(course.courseId) === courseId);

    // console.log("Provided courseId:", courseId);
    // console.log("Stored courseId:", String(user.enrolledCourses[0].courseId));

    if (enrolledCourseIndex !== -1) {
      const courseProgress = user.enrolledCourses[enrolledCourseIndex].modules;

      let totalModules = courseProgress.length;
      let completedModules = 0;

      let totalQuizzes = 0;
      let completedQuizzes = 0;

      let totalChapters = 0;
      let completedChapters = 0;

      courseProgress.forEach((module) => {
        if (module.status === "full") {
          completedModules++;

          totalChapters += module.chapters.length;
          completedChapters += module.chapters.filter((chapter) => chapter.status === "full").length;

          totalQuizzes += module.quizzes.length;
          completedQuizzes += module.quizzes.filter((quiz) => quiz.status === "full").length;
        } else {
          totalChapters += module.chapters.length;
          completedChapters += module.chapters.filter((chapter) => chapter.status === "full").length;

          totalQuizzes += module.quizzes.length;
          completedQuizzes += module.quizzes.filter((quiz) => quiz.status === "full").length;
        }
      });
      // console.log(completedModules, completedChapters, completedQuizzes, "completed");
      // console.log(totalModules, totalChapters, totalQuizzes, "total");

      // Calculate percentages
      const moduleCompletionPercentage = (completedModules / totalModules) * 100 || 0;
      const chapterCompletionPercentage = (completedChapters / totalChapters) * 100 || 0;
      const quizCompletionPercentage = (completedQuizzes / totalQuizzes) * 100 || 0;

      // Calculate overall course completion percentage
      const overallCompletionPercentage =
        (moduleCompletionPercentage + chapterCompletionPercentage + quizCompletionPercentage) / 3;

      res.status(200).send({
        message: "Course progress percentages calculated successfully",
        moduleCompletionPercentage,
        chapterCompletionPercentage,
        quizCompletionPercentage,
        overallCompletionPercentage,
      });
    } else {
      res.status(404).send({ message: "Enrolled course not found" });
    }
  } catch (error) {
    console.error("Error while fetching user course progress", error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const checkifUserCompletedCourse = async (params) => {
  try {
    const userId = params.userId;
    const courseId = params.courseId;

    let user = await User.findOne({ _id: userId });

    const enrolledCourseIndex = user.enrolledCourses.findIndex((course) => String(course.courseId) === courseId);

    if (enrolledCourseIndex !== -1) {
      const courseProgress = user.enrolledCourses[enrolledCourseIndex].modules;

      let totalModules = courseProgress.length;
      let completedModules = 0;

      let totalQuizzes = 0;
      let completedQuizzes = 0;

      let totalChapters = 0;
      let completedChapters = 0;

      courseProgress.forEach((module) => {
        if (module.status === "full") {
          completedModules++;

          totalChapters += module.chapters.length;
          completedChapters += module.chapters.filter((chapter) => chapter.status === "full").length;

          totalQuizzes += module.quizzes.length;
          completedQuizzes += module.quizzes.filter((quiz) => quiz.status === "full").length;
        } else {
          totalChapters += module.chapters.length;
          completedChapters += module.chapters.filter((chapter) => chapter.status === "full").length;

          totalQuizzes += module.quizzes.length;
          completedQuizzes += module.quizzes.filter((quiz) => quiz.status === "full").length;
        }
      });
      // console.log(completedModules, completedChapters, completedQuizzes, "completed");
      // console.log(totalModules, totalChapters, totalQuizzes, "total");

      // Calculate percentages
      const moduleCompletionPercentage = (completedModules / totalModules) * 100 || 0;
      const chapterCompletionPercentage = (completedChapters / totalChapters) * 100 || 0;
      const quizCompletionPercentage = (completedQuizzes / totalQuizzes) * 100 || 0;

      // Calculate overall course completion percentage
      const overallCompletionPercentage =
        (moduleCompletionPercentage + chapterCompletionPercentage + quizCompletionPercentage) / 3;

      return {
        message: "Course progress percentages calculated successfully",
        moduleCompletionPercentage,
        chapterCompletionPercentage,
        quizCompletionPercentage,
        overallCompletionPercentage,
        user,
      };
    } else {
      return { message: "Enrolled course not found" };
    }
  } catch (error) {
    console.error(error);
    return { message: error.message || "Internal Server Error" };
  }
};

exports.mintNft = async (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const walletAddress = req.body.walletAddress;
    const { contractAddress, title } = await Course.findOne({ _id: courseId }, { contractAddress: 1, title: 1, _id: 0 });


    const userProgressPercentage = await checkifUserCompletedCourse({ courseId: courseId, userId: userId });
    const user = await User.findOne({ _id: userId });
    const enrolledCourseIndex = user.enrolledCourses.findIndex((course) => String(course.courseId) === courseId);

    if (
      userProgressPercentage?.moduleCompletionPercentage == 100 &&
      userProgressPercentage?.chapterCompletionPercentage == 100 &&
      userProgressPercentage?.quizCompletionPercentage == 100 &&
      userProgressPercentage?.overallCompletionPercentage == 100
    ) {
      if (user.enrolledCourses[enrolledCourseIndex].nftStatus) {
        res.status(404).send({ message: "NFT already minted, check your wallet", minted: false });
      } else {
        const result = await MintPOLNft({ walletAddress, contractAddress });
        if (result.receipt.status === 1) {
          user.enrolledCourses[enrolledCourseIndex].nftStatus = true;
          user.enrolledCourses[enrolledCourseIndex].nftTxHash = result.receipt.transactionHash;
          await user.save();

          sendSmtpEmail.sender = {
            name: "Shardeum University",
            email: "university@shardeum.org",
          };
          sendSmtpEmail.to = [{ email: user.email, name: user.username }];
          sendSmtpEmail.replyTo = { email: "university@shardeum.org", name: "Shardeum University" };
          sendSmtpEmail.templateId = 282;
          sendSmtpEmail.params = {
            username: user.username,
            coursename: title

          };

          await apiInstance.sendTransacEmail(sendSmtpEmail).then(
            function (data) {
              console.log("API called successfully. Returned data: " + JSON.stringify(data));
              console.log("successfully sent email");
            },
            function (error) {
              console.error("Error completing course email", error);
            }
          );
          res
            .status(200)
            .send({ message: "Nft successfully Minted", minted: true, TxHash: result.receipt.transactionHash });
        } else {
          res.status(400).send({ message: "Error while minting NFT", minted: false });
        }
      }
    } else {
      res.status(400).send({ message: "Course not yet completed", minted: false });
    }
  } catch (error) {
    console.log(error);
    // res.status(400).send({ message: "Error while minting NFT", minted: false });
  }
};

exports.deleteImage = (req, res) => {
  const params = {
    Bucket: process.env.DO_SPACE_BUCKET,
    Key: req.body.key
  };

  s3.deleteObject(params, function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data);
    }
  })
}

exports.checkifUserCompletedCourse = checkifUserCompletedCourse;
