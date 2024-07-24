require("dotenv").config();

const db = require("../models");
const User = require("../models/User");
const { fetchCoursesFromCMS, processCourse, createNewEnrollment } = require("./helper.courseController");
const Course = db.course;

exports.getAllCoursesWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const totalItems = await Course.countDocuments();

    const courses = await Course.find({}, { contractAddress: 0, usersEnrolled: 0, softDelete: false })
      .skip((page - 1) * limit)
      .limit(limit);
    if (courses.length === 0) {
      return res.status(404).send({ message: "No courses found" });
    }
    res.status(200).send({
      message: "Retrieved successfully",
      courses,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
}

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}, { contractAddress: 0, usersEnrolled: 0 });
    res.status(200).send({ message: "retrieved successfully", courses });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.getAllCoursesDash = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send({ message: "retrieved successfully", courses });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.courseEnrolled = async (req, res) => {
  const { courseId } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }

    const enrolledCourseIndex = user.enrolledCourses.findIndex(
      (course) => String(course.courseId) === courseId
    );

    if (enrolledCourseIndex !== -1) {
      await updateExistingEnrollment(user, course, enrolledCourseIndex);
      return res.status(200).send({
        message: "User enrollment updated successfully",
      });
    } else {
      await createNewEnrollment(user, course);
      return res.status(200).send({
        message: "User enrolled in the course successfully",
        courseId: courseId,
      });
    }
  } catch (error) {
    console.error("Error in course enrollment:", error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};


exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.query.courseId }, {
      contractAddress: 0
    })

    res.status(200).send({ message: "retrieved successfully", course });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.getCourseByName = async (req, res) => {
  try {
    const course = await Course.findOne({ title: req.params.title }, {
      contractAddress: 0, usersEnrolled: 0
    })

    res.status(200).send({ message: "retrieved successfully", course });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.deleteCourseById = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete({ _id: req.query.id });
    res.status(200).send({ message: "Successfully Deleted", course });
  } catch (error) {
    console.log("error in deleting course", error);
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.createModel = async (req, res) => {
  if (!(req.body.model == "course")) return
  const courseData = req.body.entry;
  await processCourse(courseData)
  console.log("Course updated successfully", courseData?.title);
  res.status(200).send({ message: "Course data synchronized successfully" });

}

exports.syncData = async (req, res) => {
  try {
    const coursesData = await fetchCoursesFromCMS();
    await Promise.all(coursesData.map(processCourse));
    res.status(200).send({ message: "Course data synchronized successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};

exports.softDelete = async (req, res) => {
  try {
    const courseData = await Course.findOne({ _id: req.query.courseId });
    if (courseData) {
      const newSoftDeleteStatus = !courseData.softDelete;
      courseData.softDelete = newSoftDeleteStatus;

      await courseData.save();
      res.status(200).send({
        message: "Soft delete successful",
        newSoftDeleteStatus: newSoftDeleteStatus,
      });
    } else {
      res.status(400).send({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
};



// NASIMS CREATE COURSE PARSER
// const courseDetails = {
//   strapiId: courseData.id,
//   title: courseData.title,
//   description: courseData.description,
//   aboutCourse: courseData.aboutCourse,
//   duration: courseData.duration,
//   level: courseData.level,
//   skills: courseData.skills,
//   nftImage: courseData.nftImage.formats?.medium?.url,
//   banner: courseData.banner[0]?.url,
//   whatYouLearn: courseData.whatYouLearn.map((item) => item.title),
//   contractAddress: courseData.contractAddress,
//   faq: courseData.faq.map((faqItem) => ({
//     faqTitle: faqItem.faqTitle,
//     faqAnswer: faqItem.faqAnswer,
//   })),
//   module: courseData.module,
// };
// const existingCourse = await Course.findOne({ strapiId: courseData.id });

// if (existingCourse) {
//   arrModuleId = []
//   // Update existing modules, chapters, quizzes
//   for (const moduleItem of courseDetails.module) {
//     const existingModule = existingCourse.module.find(m => m.strapiId === moduleItem.id);
//     if (existingModule) {

//       existingModule.moduleTitle = moduleItem.moduleTitle;
//       // Update chapters
//       arrChapterId = []

//       for (const chapterItem of moduleItem.chapter) {
//         const existingChapter = existingModule.chapter.find(c => c.strapiId === chapterItem.id);
//         if (existingChapter) {
//           existingChapter.title = chapterItem.title;
//           existingChapter.content = chapterItem.content;
//         } else {
//           let resChapter = { ...chapterItem };
//           resChapter.strapiId = resChapter.id;
//           delete resChapter.id;
//           existingModule.chapter.push(resChapter); // Add new chapter
//         }
//         arrChapterId.push(chapterItem.id)
//       }
//       // delete chapters

//       existingModule.chapter = existingModule.chapter.filter(c => (arrChapterId.includes(c.strapiId)))
//       // Update quizzes
//       arrQuizId = []

//       for (const quizItem of moduleItem.quizes) {
//         const existingQuiz = existingModule.quizzes.find(q => q.strapiId === quizItem.id);
//         if (existingQuiz) {
//           // Update existing quiz fields
//           existingQuiz.quizTitle = quizItem.quizTitle;
//           existingQuiz.a = quizItem.a;
//           existingQuiz.b = quizItem.b;
//           existingQuiz.c = quizItem.c;
//           existingQuiz.d = quizItem.d;
//           existingQuiz.answer = quizItem.answer;
//         } else {
//           let resQuiz = { ...quizItem };
//           resQuiz.strapiId = resQuiz.id;
//           delete resQuiz.id;
//           existingModule.quizzes.push(resQuiz); // Add new quiz
//         }
//         arrQuizId.push(quizItem.id)
//       }
//       // delete quizzes
//       existingModule.quizzes = existingModule.quizzes.filter(q => (arrQuizId.includes(q.strapiId)))

//     } else {
//       let resModule = { ...moduleItem };
//       resModule.strapiId = resModule.id;
//       delete resModule.id;

//       for (let key in resModule) {
//         // console.log(key, resModule[key])
//         if (key == 'chapter' || key == 'quizes') {
//           console.log(key, resModule[key])
//           for (let i = 0; i < resModule[key].length; i++) {
//             resModule[key][i].strapiId = resModule[key][i].id;
//             delete resModule[key][i].id
//           }

//         }

//       }
//       existingCourse.module.push(resModule); // Add new module
//     }
//     arrModuleId.push(moduleItem.id)
//   }
//   existingCourse.module = existingCourse.module.filter(m => arrModuleId.includes(m.strapiId))
//   courseDetails.module = existingCourse.module.filter(m => arrModuleId.includes(m.strapiId))

//   // Save updated course
//   const updatedCourse = await Course.findOneAndUpdate(
//     { strapiId: courseData.id },
//     { $set: courseDetails },
//     // { new: true }
//   );
//   console.log("course updated:", updatedCourse._id);
//   console.log("course updated:", existingCourse._id);
// } else {
//   courseDetails.module = courseData.module.map((moduleItem) => ({
//     moduleTitle: moduleItem.moduleTitle,
//     chapter: moduleItem.chapter.map((chapterItem) => ({
//       title: chapterItem.title,
//       content: chapterItem.content,
//       strapiId: chapterItem.id,
//     })),
//     quizzes: moduleItem.quizes.map((quizItem) => ({
//       quizTitle: quizItem.quizTitle,
//       a: quizItem.a,
//       b: quizItem.b,
//       c: quizItem.c,
//       d: quizItem.d,
//       answer: quizItem.answer,
//       strapiId: quizItem.id,
//     })),
//     program: moduleItem.program ? {
//       strapiId: moduleItem.program.id,
//       duration: moduleItem.program.duration,
//       boilerplate_code: moduleItem.program.boilerplate_code,
//       description: mapRichTextNodesToSchema(moduleItem.program.description[0]?.children),
//       test_file_content: moduleItem.program.test_file_content,
//       solution: moduleItem.program.solution,
//     } : null,
//     strapiId: moduleItem.id,
//   }))

//   // Create a new Course document
//   const course = new Course(courseDetails);
//   console.log(course);
//   const res = await course.save();
//   console.log(res);
// }


// exports.updateModel = async (req, res) => {
//   if (!(req.body.model == "course")) return
//   console.log(req.body.entry)
//   const courseData = req.body.entry;
//   const courseDetails = {
//     strapiId: courseData.id,
//     title: courseData.title,
//     description: courseData.description,
//     aboutCourse: courseData.aboutCourse,
//     duration: courseData.duration,
//     level: courseData.level,
//     skills: courseData.skills,
//     nftImage: courseData.nftImage.formats?.medium?.url,
//     banner: courseData.banner[0]?.url,
//     whatYouLearn: courseData.whatYouLearn.map((item) => item.title),
//     contractAddress: courseData.contractAddress,
//     faq: courseData.faq.map((faqItem) => ({
//       faqTitle: faqItem.faqTitle,
//       faqAnswer: faqItem.faqAnswer,
//     })),
//     module: courseData.module,
//   };
//   courseDetails.module = courseData.module.map((moduleItem) => ({
//     moduleTitle: moduleItem.moduleTitle,
//     chapter: moduleItem.chapter.map((chapterItem) => ({
//       title: chapterItem.title,
//       content: chapterItem.content,
//       strapiId: chapterItem.id,
//     })),
//     quizzes: moduleItem.quizes.map((quizItem) => ({
//       quizTitle: quizItem.quizTitle,
//       a: quizItem.a,
//       b: quizItem.b,
//       c: quizItem.c,
//       d: quizItem.d,
//       answer: quizItem.answer,
//       strapiId: quizItem.id,
//     })),
//     strapiId: moduleItem.id,
//   }))
//   const updatedCourse = await Course.findOneAndUpdate(
//     { strapiId: courseData.id },
//     { $set: courseDetails },
//   );
//   console.log(updatedCourse)
// }