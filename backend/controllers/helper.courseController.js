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

async function processCourse(courseData, partnerData) {
    const courseDetails = extractCourseDetails(courseData);
    const existingCourse = await Course.findOne({ strapiId: courseData.id });

    if (existingCourse) {
        await updateExistingCourse(existingCourse, courseDetails, partnerData);
    } else {
        await createNewCourse(courseDetails, partnerData);
    }
}

function extractCourseDetails(courseData) {
    return {
        strapiId: courseData.id,
        title: courseData.title,
        description: courseData.description,
        aboutCourse: courseData.aboutCourse,
        duration: courseData.duration,
        level: courseData.level,
        skills: courseData.skills,
        nftImage: courseData.nftImage.data?.url,
        banner: courseData.banner[0]?.url,
        whatYouLearn: courseData.whatYouLearn.map((item) => item.title),
        contractAddress: courseData.contractAddress,
        faq: courseData.faq.map((faqItem) => ({
            faqTitle: faqItem.faqTitle,
            faqAnswer: faqItem.faqAnswer,
        })),
        module: courseData.module,
    };
}

async function updateExistingCourse(existingCourse, courseDetails, partnerData) {
    const updatedModules = processModules(courseDetails.module, existingCourse.module);

    //upading partner info
    const updatedPartnerObject = {
        name: partnerData.name,
        description: partnerData.description,
        avatar: partnerData.avatar.data.attributes.formats.thumbnail.url
    }

    const updateObject = {
        title: courseDetails.title,
        description: courseDetails.description,
        aboutCourse: courseDetails.aboutCourse,
        duration: courseDetails.duration,
        level: courseDetails.level,
        skills: courseDetails.skills,
        nftImage: courseDetails.nftImage,
        banner: courseDetails.banner,
        whatYouLearn: courseDetails.whatYouLearn,
        contractAddress: courseDetails.contractAddress,
        faq: courseDetails.faq,
        partner: updatedPartnerObject,
    };

    // Add module updates using dot notation
    updatedModules.forEach((module, index) => {
        updateObject[`module.${index}.strapiId`] = module.strapiId;
        updateObject[`module.${index}.moduleTitle`] = module.moduleTitle;

        module.chapter.forEach((chapter, chapterIndex) => {
            updateObject[`module.${index}.chapter.${chapterIndex}.strapiId`] = chapter.strapiId;
            updateObject[`module.${index}.chapter.${chapterIndex}.title`] = chapter.title;
            updateObject[`module.${index}.chapter.${chapterIndex}.content`] = chapter.content;
        });

        module.quizzes.forEach((quiz, quizIndex) => {
            updateObject[`module.${index}.quizzes.${quizIndex}.strapiId`] = quiz.strapiId;
            updateObject[`module.${index}.quizzes.${quizIndex}.quizTitle`] = quiz.quizTitle;
            updateObject[`module.${index}.quizzes.${quizIndex}.a`] = quiz.a;
            updateObject[`module.${index}.quizzes.${quizIndex}.b`] = quiz.b;
            updateObject[`module.${index}.quizzes.${quizIndex}.c`] = quiz.c;
            updateObject[`module.${index}.quizzes.${quizIndex}.d`] = quiz.d;
            updateObject[`module.${index}.quizzes.${quizIndex}.answer`] = quiz.answer;
        });

        if (module.program) {
            updateObject[`module.${index}.program.strapiId`] = module.program.strapiId;
            updateObject[`module.${index}.program.duration`] = module.program.duration;
            updateObject[`module.${index}.program.boilerplate_code`] = module.program.boilerplate_code;
            updateObject[`module.${index}.program.description`] = module.program.description;
            updateObject[`module.${index}.program.test_file_content`] = module.program.test_file_content;
            updateObject[`module.${index}.program.solution`] = module.program.solution;
        }
    });

    const updatedCourse = await Course.findOneAndUpdate(
        { strapiId: courseDetails.strapiId },
        { $set: updateObject },
        {
            new: true,
            runValidators: true,
            upsert: false,
        }
    );

    if (!updatedCourse) {
        throw new Error(`Course with strapiId ${courseDetails.strapiId} not found`);
    }
    console.log("Course updated:", updatedCourse.title);
    return updatedCourse;
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
    if (!newProgram) return null;

    if (existingProgram) {
        return {
            _id: existingProgram._id,
            strapiId: existingProgram.strapiId,
            duration: newProgram.duration,
            boilerplate_code: newProgram.boilerplate_code,
            description: newProgram.description,
            test_file_content: newProgram.test_file_content,
            solution: newProgram.solution,
        };
    } else {
        return {
            strapiId: newProgram.id,
            duration: newProgram.duration,
            boilerplate_code: newProgram.boilerplate_code,
            description: newProgram.description,
            test_file_content: newProgram.test_file_content,
            solution: newProgram.solution,
        };
    }
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

async function createNewCourse(courseDetails, partnerData) {
    courseDetails.module = courseDetails.module.map(createNewModule);
    //Adding partner info
    const partnerObject = {
        name: partnerData.name,
        description: partnerData.description,
        avatar: partnerData.avatar.data.attributes.formats.thumbnail.url
    }
    courseDetails.partner = partnerObject;
    const course = new Course(courseDetails);
    const savedCourse = await course.save();
    console.log("New course created:", savedCourse?.title);
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

        if (module.program !== undefined) {
            totalPrograms++;
            if (module?.program?.status === "full") {
                completedPrograms++;
            }
        }
    });

    const moduleCompletionPercentage = calculatePercentage(completedModules, totalModules);
    const chapterCompletionPercentage = calculatePercentage(completedChapters, totalChapters);
    const quizCompletionPercentage = calculatePercentage(completedQuizzes, totalQuizzes);
    const programCompletionPercentage = totalPrograms > 0
        ? calculatePercentage(completedPrograms, totalPrograms)
        : 100;

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
        programCompletionPercentage: programCompletionPercentage || 0,
        overallCompletionPercentage
    };
}
function calculatePercentage(completed, total) {
    return total > 0 ? (completed / total) * 100 : 0;
}

function calculateOverallPercentage(percentages) {
    const validPercentages = percentages.filter(p => p !== null && !isNaN(p));
    return validPercentages.length > 0
        ? validPercentages.reduce((sum, percentage) => sum + percentage, 0) / validPercentages.length
        : 0;
}


module.exports = { fetchCoursesFromCMS, processCourse, createNewEnrollment, updateExistingEnrollment, calculateCompletionPercentages, calculateOverallPercentage }
