const axios = require("axios");
const Course = require("../models/Course");
async function fetchCoursesFromCMS() {
    const response = await axios({
        method: "GET",
        url: `${process.env.CMS_URL}/api/courses/?populate=deep`,
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
    });
    return response.data.data;
}

async function processCourse(courseData) {
    const courseDetails = extractCourseDetails(courseData);
    const existingCourse = await Course.findOne({ strapiId: courseData.id });

    if (existingCourse) {
        await updateExistingCourse(existingCourse, courseDetails);
    } else {
        await createNewCourse(courseDetails);
    }
}

function extractCourseDetails(courseData) {
    return {
        strapiId: courseData.id,
        title: courseData.attributes.title,
        description: courseData.attributes.description,
        aboutCourse: courseData.attributes.aboutCourse,
        duration: courseData.attributes.duration,
        level: courseData.attributes.level,
        skills: courseData.attributes.skills,
        nftImage: courseData.attributes.nftImage.data?.attributes?.url,
        banner: courseData.attributes.banner.data[0]?.attributes?.url,
        whatYouLearn: courseData.attributes.whatYouLearn.map((item) => item.title),
        contractAddress: courseData.attributes.contractAddress,
        faq: courseData.attributes.faq.map((faqItem) => ({
            faqTitle: faqItem.faqTitle,
            faqAnswer: faqItem.faqAnswer,
        })),
        module: courseData.attributes.module,
    };
}

async function updateExistingCourse(existingCourse, courseDetails) {
    const updatedModules = processModules(courseDetails.module, existingCourse.module);
    courseDetails.module = updatedModules;

    const updatedCourse = await Course.findOneAndUpdate(
        { strapiId: courseDetails.strapiId },
        { $set: courseDetails },
        { new: true }
    );
    console.log("Course updated:", updatedCourse._id);
}

function processModules(newModules, existingModules) {
    return newModules.map((newModule) => {
        const existingModule = existingModules.find(m => m.strapiId === newModule.id);
        return existingModule ? updateModule(existingModule, newModule) : createNewModule(newModule);
    });
}

function updateModule(existingModule, newModule) {
    return {
        ...existingModule,
        moduleTitle: newModule.moduleTitle,
        chapter: processChapters(newModule.chapter, existingModule.chapter),
        quizzes: processQuizzes(newModule.quizes, existingModule.quizzes),
        program: processProgram(newModule.program, existingModule.program)
    };
}

function processChapters(newChapters, existingChapters = []) {
    return newChapters.map((newChapter) => {
        const existingChapter = existingChapters.find(c => c.strapiId === newChapter.id);
        return existingChapter
            ? { ...existingChapter, title: newChapter.title, content: newChapter.content }
            : { ...newChapter, strapiId: newChapter.id };
    });
}

function processQuizzes(newQuizzes, existingQuizzes = []) {
    return newQuizzes.map((newQuiz) => {
        const existingQuiz = existingQuizzes.find(q => q.strapiId === newQuiz.id);
        return existingQuiz
            ? { ...existingQuiz, ...newQuiz, strapiId: newQuiz.id }
            : { ...newQuiz, strapiId: newQuiz.id };
    });
}

function processProgram(newProgram, existingProgram) {
    if (!newProgram) return existingProgram;
    return existingProgram
        ? {
            ...existingProgram,
            ...newProgram,
            strapiId: newProgram.id,
            description: newProgram.description || existingProgram.description,
        }
        : {
            ...newProgram,
            strapiId: newProgram.id,
            description: newProgram.description || [],
        };
}

function createNewModule(moduleItem) {
    return {
        moduleTitle: moduleItem.moduleTitle,
        chapter: moduleItem.chapter.map((chapterItem) => ({
            title: chapterItem.title,
            content: chapterItem.content,
            strapiId: chapterItem.id,
        })),
        quizzes: moduleItem.quizes.map((quizItem) => ({
            quizTitle: quizItem.quizTitle,
            a: quizItem.a,
            b: quizItem.b,
            c: quizItem.c,
            d: quizItem.d,
            answer: quizItem.answer,
            strapiId: quizItem.id,
        })),
        program: moduleItem.program ? {
            strapiId: moduleItem.program.id,
            duration: moduleItem.program.duration,
            boilerplate_code: moduleItem.program.boilerplate_code,
            description: moduleItem.program.description,
            test_file_content: moduleItem.program.test_file_content,
            solution: moduleItem.program.solution,
        } : null,
        strapiId: moduleItem.id,
    };
}

async function createNewCourse(courseDetails) {
    courseDetails.module = courseDetails.module.map(createNewModule);
    const course = new Course(courseDetails);
    const savedCourse = await course.save();
    console.log("New course created:", savedCourse._id);
}

async function updateExistingEnrollment(user, course, enrolledCourseIndex) {
    const existingCourseProgress = user.enrolledCourses[enrolledCourseIndex];

    existingCourseProgress.modules = course.module.map(newModule => {
        const existingModule = existingCourseProgress.modules.find(
            m => String(m.strapiId) === String(newModule.strapiId)
        );

        return {
            _id: newModule._id,
            strapiId: newModule.strapiId,
            chapters: updateChapters(newModule.chapter, existingModule?.chapters),
            quizzes: updateQuizzes(newModule.quizzes, existingModule?.quizzes),
            program: updateProgramEnrollment(newModule.program, existingModule?.program)
        };
    });

    await addUserToCourseIfNeeded(course, user._id);
    await user.save();
}

function updateChapters(newChapters, existingChapters = []) {
    return newChapters.map(newChapter => {
        const existingChapter = existingChapters.find(
            c => String(c.strapiId) === String(newChapter.strapiId)
        );
        return {
            _id: newChapter._id,
            strapiId: newChapter.strapiId,
            status: existingChapter?.status || "none"
        };
    });
}

function updateQuizzes(newQuizzes, existingQuizzes = []) {
    return newQuizzes.map(newQuiz => {
        const existingQuiz = existingQuizzes.find(
            q => String(q.strapiId) === String(newQuiz.strapiId)
        );
        return {
            _id: newQuiz._id,
            strapiId: newQuiz.strapiId,
            answer: newQuiz.answer,
            status: existingQuiz?.status || "none"
        };
    });
}

function updateProgramEnrollment(newProgram, existingProgram) {
    if (!newProgram) return null;
    return existingProgram
        ? {
            ...existingProgram,
            _id: newProgram._id,
            strapiId: newProgram.strapiId,
            code: existingProgram.code,
            passedCases: existingProgram.passedCases,
            totalCases: existingProgram.passedCases,
            status: existingProgram.status || "none",
            userSolution: existingProgram.userSolution || ""
        }
        : {
            _id: newProgram._id,
            strapiId: newProgram.strapiId,
            code: newProgram.code,
            solution: newProgram.solution,
            passedCases: newProgram.passedCases,
            totalCases: newProgram.passedCases,
            status: "none",
            userSolution: ""
        };
}

async function createNewEnrollment(user, course) {
    console.log("hi here");
    const userEnrolledCourse = {
        courseId: course._id,
        modules: course.module.map(module => ({
            _id: module._id,
            strapiId: module.strapiId,
            chapters: module.chapter.map(chapter => ({
                _id: chapter._id,
                strapiId: chapter.strapiId,
                status: "none"
            })),
            quizzes: module.quizzes.map(quiz => ({
                _id: quiz._id,
                answer: quiz.answer,
                strapiId: quiz.strapiId,
                status: "none"
            })),
            program: module.program ? {
                _id: module.program._id,
                strapiId: module.program.strapiId,
                code: "",
                walletAddress: "",
                passedCases: "",
                totalCases: "",
                testResults: [],
                status: "none",
                userSolution: ""
            } : null
        }))
    };
    console.log(userEnrolledCourse);

    user.enrolledCourses.push(userEnrolledCourse);
    await addUserToCourseIfNeeded(course, user._id);
    await user.save();
}

async function addUserToCourseIfNeeded(course, userId) {
    if (!course.usersEnrolled.some(enrolledId => enrolledId.equals(userId))) {
        course.usersEnrolled.push(userId);
        await course.save();
    }
}
function calculateCompletionPercentages(courseProgress) {
    let totalModules = courseProgress.length;
    let completedModules = 0;
    let totalChapters = 0;
    let completedChapters = 0;
    let totalQuizzes = 0;
    let completedQuizzes = 0;
    let totalPrograms = 0;
    let completedPrograms = 0;

    courseProgress.forEach((module) => {
        if (module.status === "full") {
            completedModules++;
        }

        totalChapters += module.chapters.length;
        completedChapters += module.chapters.filter((chapter) => chapter.status === "full").length;

        totalQuizzes += module.quizzes.length;
        completedQuizzes += module.quizzes.filter((quiz) => quiz.status === "full").length;

        if (module.program) {
            totalPrograms++;
            if (module.program.status === "full") {
                completedPrograms++;
            }
        }
    });

    const moduleCompletionPercentage = calculatePercentage(completedModules, totalModules);
    const chapterCompletionPercentage = calculatePercentage(completedChapters, totalChapters);
    const quizCompletionPercentage = calculatePercentage(completedQuizzes, totalQuizzes);
    const programCompletionPercentage = calculatePercentage(completedPrograms, totalPrograms);

    const overallCompletionPercentage = calculateOverallPercentage([
        moduleCompletionPercentage,
        chapterCompletionPercentage,
        quizCompletionPercentage,
        programCompletionPercentage
    ]);

    return {
        moduleCompletionPercentage,
        chapterCompletionPercentage,
        quizCompletionPercentage,
        programCompletionPercentage,
        overallCompletionPercentage
    };
}
function calculatePercentage(completed, total) {
    return (completed / total) * 100 || 0;
}

function calculateOverallPercentage(percentages) {
    const validPercentages = percentages.filter(p => !isNaN(p) && p !== null);
    return validPercentages.length > 0
        ? validPercentages.reduce((sum, percentage) => sum + percentage, 0) / validPercentages.length
        : 0;
}


module.exports = { fetchCoursesFromCMS, processCourse, createNewEnrollment, updateExistingEnrollment, calculateCompletionPercentages, calculateOverallPercentage }
