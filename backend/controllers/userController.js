require("dotenv").config();
const config = process.env;
const db = require("../models");
const Course = db.course;
const User = db.user;
const Role = db.role;
const Token = db.userToken;
const _ = require('lodash');

exports.allAccess = (req, res) => {
  console.log(req.data);
  console.log(req.body);
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

exports.courseEnrolled = async (req, res) => {
  const { courseId } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if the course is already enrolled by the user
    const enrolledCourseIndex = user.enrolledCourses.findIndex(course => String(course.courseId) === courseId);
    console.log(enrolledCourseIndex);
    if (enrolledCourseIndex !== -1) {
      // console.log(user.enrolledCourses[enrolledCourseIndex].modules.length, "check user1");

      const existingCourseProgress = user.enrolledCourses[enrolledCourseIndex];

      // retrieve new course data
      let newCourse = await Course.findOne({ _id: courseId });
      // console.log((existingCourseProgress.modules).length, "len1")
      existingCourseProgress.modules.forEach(existingModule => {
        const newModule = newCourse.module.find(module => String(module.strapiId) === String(existingModule.strapiId));
        // console.log(existingModule.status, existingModule.strapiId);
        if (newModule) {
          existingModule.chapters.forEach(existingChapter => {

            const newChapter = newModule.chapter.find(chapter => String(chapter.strapiId) === String(existingChapter.strapiId));

            if (!newChapter) {
              // Remove the chapter from existingModule if it's not found in the newModule
              console.log(newChapter);
              existingModule.chapters = existingModule.chapters.filter(chapter => String(chapter.strapiId) !== String(existingChapter.strapiId));
            }
          });

          newModule.chapter.forEach(existingChapter => {
            const isNewChapter = !existingModule.chapters.some(chapter => String(chapter.strapiId) === String(existingChapter.strapiId));
            // console.log(`Chapter ${existingChapter._id} is new: ${isNewChapter}`);

            if (isNewChapter) {
              // Handle addition of new chapter
              // ...
              // console.log(isNewChapter)
              existingModule.chapters.push({ _id: existingChapter._id, strapiId: existingChapter.strapiId, status: 'none' });
            }
          });


          // console.log((existingModule.quizzes).length, newModule.quizzes.length);


          // Compare quizzes within modules
          existingModule.quizzes.forEach(existingQuiz => {
            const newQuiz = newModule.quizzes.find(quiz => String(quiz.strapiId) === String(existingQuiz.strapiId));
            if (newQuiz) {
              // Compare quiz properties and update them if changed
              // For example:
              // existingQuiz.status = newQuiz.status;
              existingQuiz.answer = newQuiz.answer;
              // ...
            } else {
              // Remove the quiz from existingModule if it's not found in the newModule
              existingModule.quizzes = existingModule.quizzes.filter(quiz => String(quiz.strapiId) !== String(existingQuiz.strapiId));
            }
          });

          newModule.quizzes.forEach(existingQuiz => {
            const isNewQuiz = !existingModule.quizzes.some(quiz => String(quiz.strapiId) === String(existingQuiz.strapiId));
            // console.log(`Chapter ${existingQuiz._id} is new: ${isNewQuiz}`);

            if (isNewQuiz) {
              // Handle addition of new chapter
              // ...
              // console.log(isNewChapter)
              existingModule.quizzes.push({ _id: existingQuiz._id, strapiId: existingQuiz.strapiId, status: 'none' });
            }
          });

          // console.log((existingModule.quizzes).length, newModule.quizzes.length);


          // console.log(existingModule.status, existingModule.strapiId);

        } else {
          // console.log(existingModule.status);

          existingCourseProgress.modules = existingCourseProgress.modules.filter(module => String(module.strapiId) !== String(existingModule.strapiId));
        }
      });

      newCourse.module.forEach(newModule => {
        const isModuleAlreadyExists = existingCourseProgress.modules.some(existingModule => String(existingModule.strapiId) === String(newModule.strapiId));
        if (!isModuleAlreadyExists) {
          // Handle new module addition
          // ...
          let res = {};
          res._id = newModule._id;
          res.strapiId = newModule.strapiId;
          // res.status = 
          res.chapters = newModule.chapter.map((chapter) => {
            return { _id: chapter._id, strapiId: chapter.strapiId };
          });
          res.quizzes = newModule.quizzes.map((quiz) => {
            return { _id: quiz._id, answer: quiz.answer, strapiId: quiz.strapiId };
          });

          existingCourseProgress.modules.push(res);
        }

      });
      // console.log((existingCourseProgress.modules).length, "len2")

      // console.log(user.enrolledCourses[enrolledCourseIndex].modules.length, "check user2");
      await user.save();

      console.log(newCourse.usersEnrolled);

      if (!newCourse.usersEnrolled.some(userId => userId.equals(user._id))) {
        newCourse.usersEnrolled.push(user._id);
        console.log(newCourse.usersEnrolled);
        await newCourse.save();
        console.log("User added to the course's usersEnrolled array");
      } else {
        console.log("User already added in the course's usersEnrolled array");
      }
      


      return res.status(200).send({ message: 'User is already enrolled in this course but updated user-progress if there was change in Course' });
    }

    let course = await Course.findOne({ _id: courseId });
    console.log(course.usersEnrolled);

    if (!course.usersEnrolled.some(userId => userId.equals(user._id))) {
      course.usersEnrolled.push(user._id);
      console.log(course.usersEnrolled);
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
      // res.status = 
      res.chapters = module.chapter.map((chapter) => {
        return { _id: chapter._id, strapiId: chapter.strapiId };
      });
      res.quizzes = module.quizzes.map((quiz) => {
        return { _id: quiz._id, answer: quiz.answer, strapiId: quiz.strapiId };
      });
      return res;
    })
    // console.log(userEnrolledCourse.modules);

    // // Enroll the user in the course
    user.enrolledCourses.push(userEnrolledCourse);
    await user.save();

    res.status(200).send({ message: 'User enrolled in the course successfully', courseId: courseId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

exports.userProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.body?.courseId;

    let user = await User.findOne({ _id: userId });

    if (courseId) {
      const enrolledCourse = user.enrolledCourses.find(course => String(course.courseId) === courseId);
      // console.log(enrolledCourse);

      res.status(200).send({ message: "course progress retrieved", enrolledCourse });
    }
    else {
      res.status(200).send({ message: "user's entire courses and their progress", enrolledCourses: user.enrolledCourses });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
}

exports.updateCourseProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const updatedEnrolledCourse = req.body.updatedEnrolledCourse;

    let user = await User.findOne({ _id: userId });

    const enrolledCourseIndex = user.enrolledCourses.findIndex(course => String(course.courseId) === courseId);
    console.log(enrolledCourseIndex);

    if (enrolledCourseIndex !== -1) {

      user.enrolledCourses[enrolledCourseIndex] = updatedEnrolledCourse;
      await user.save();
      res.status(200).send({
        message: "Course progress updated successfully",
        updatedProgress: user.enrolledCourses[enrolledCourseIndex]
      });
    } else {
      res.status(404).send({ message: "Enrolled course not found" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
}

exports.userCourseProgressPercentage = async(req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.body.courseId;

    let user = await User.findOne({ _id: userId });
    console.log(user.enrolledCourses)

    const enrolledCourseIndex = user.enrolledCourses.findIndex(course => String(course.courseId) === courseId);
    console.log(enrolledCourseIndex);

    console.log("Provided courseId:", courseId);
    console.log("Stored courseId:", String(user.enrolledCourses[0].courseId));

    if (enrolledCourseIndex !== -1) {
      const courseProgress = user.enrolledCourses[enrolledCourseIndex].modules;

      let totalModules = courseProgress.length;
      let completedModules = 0;

      let totalQuizzes = 0;
      let completedQuizzes = 0;

      let totalChapters = 0;
      let completedChapters = 0;

      courseProgress.forEach((module) => {
        if (module.status === 'full') {
          completedModules++;

          totalChapters += module.chapters.length;
          completedChapters += module.chapters.filter(chapter => chapter.status === 'full').length;

          totalQuizzes += module.quizzes.length;
          completedQuizzes += module.quizzes.filter(quiz => quiz.status === 'full').length;
        } else {
          totalChapters += module.chapters.length;
          completedChapters += module.chapters.filter(chapter => chapter.status === 'full').length;

          totalQuizzes += module.quizzes.length;
          completedQuizzes += module.quizzes.filter(quiz => quiz.status === 'full').length;
        }
      });
      console.log(completedModules, completedChapters, completedQuizzes, "completed");
      console.log(totalModules, totalChapters, totalQuizzes, "total")

      // Calculate percentages
      const moduleCompletionPercentage = (completedModules / totalModules) * 100 || 0;
      const chapterCompletionPercentage = (completedChapters / totalChapters) * 100 || 0;
      const quizCompletionPercentage = (completedQuizzes / totalQuizzes) * 100 || 0;

      // Calculate overall course completion percentage
      const overallCompletionPercentage = (moduleCompletionPercentage + chapterCompletionPercentage + quizCompletionPercentage) / 3;

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
    console.error(error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
}