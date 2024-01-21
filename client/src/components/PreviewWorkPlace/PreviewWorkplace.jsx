import React, { useContext, useEffect, useState } from "react";
import CourseAcordian from "../CourseAcoridan/CourseAcordian.jsx";

import { useParams } from "react-router-dom";
import { courseProgressAPI, getCoursebyName, updateCourseProgressAPI } from "../../utils/api/CourseAPI.jsx";
import "./WorkPlace.scss";
import Quiz from "../Quiz/Quiz.jsx";
import { ParentContext } from "../../contexts/ParentContext.jsx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ScrollToTop from "../../ScrollToTop.jsx";
import NftModal from "./component/NftModal.jsx";
import { getUserCourseProgressPercentage } from "../../utils/api/CourseAPI.jsx";
import DisplayChapter from "./component/DisplayChapter.jsx";
import axios from "axios";
import PreviewCourseAcc from "../PreviewCourseAcoridan/PreviewCourseAcordian.jsx";
import PreviewQuiz from "../PreviewQuiz/PreviewQuiz.jsx";

export default function PreviewWorkplace() {
  const params = useParams();
  const navigate = useNavigate();
  const { loggedInUserData } = useContext(ParentContext);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [moduleContent, setModuleContent] = useState([]);
  const [courseContent, setcourseContent] = useState({});
  const [currentChapter, setCurrentChapter] = useState({});
  const [currentModule, setcurrentModule] = useState(null);
  const [isModuleChanged, setisModuleChanged] = useState(false);
  const [isCourseDataChanged, setisCourseDataChanged] = useState(false);
  const [userCourseProgress, setuserCourseProgress] = useState({});
  const [isQuizSelected, setisQuizSelected] = useState(false);
  const [currentChapterStatus, setcurrentChapterStatus] = useState("none");
  const [currentModuleAllChapterStatus, setcurrentModuleAllChapterStatus] = useState("none");
  const [currentQuiz, setcurrentQuiz] = useState([]);
  const [nftModalIsOpen, setnftModalIsOpen] = useState(false);
  const [currentCourseProgress, setcurrentCourseProgress] = useState({});

  const isMobile = screenWidth < 768;

  // const getUserProgress = async () => {
  //   const data = await courseProgressAPI({
  //     courseId: courseContent?._id,
  //     accessToken: loggedInUserData?.accessToken,
  //     userId: loggedInUserData?._id,
  //   });

  //   setuserCourseProgress(data?.enrolledCourse);
  // };

  // const getProgressPercentage = async () => {
  //   try {
  //     const data = await getUserCourseProgressPercentage({
  //       courseId: courseContent?._id,
  //       userId: loggedInUserData?._id,
  //       accessToken: loggedInUserData?.accessToken,
  //     });
  //     setcurrentCourseProgress(data);
  //   } catch (error) {
  //     console.error("Error fetching course progress:", error);
  //   }
  // };

  // useEffect(() => {
  //   getProgressPercentage();
  // }, [courseContent, userCourseProgress]);


  useEffect(() => {
    const getCourseInfo = async () => {
      const { data } = await axios.get(`https://cms.university.shardeum.org/api/courses/${params.id}?publicationState=preview&filters[publishedAt][$null]=true&populate=deep`)
      console.log(data);
      setcourseContent(data.data.attributes);
      setModuleContent(data?.data.attributes.module ? data?.data.attributes.module : []);
      setCurrentChapter(data?.data.attributes.module[0]?.chapter[0]);
      setcurrentModule(data?.data.attributes.module[0]);
      setisCourseDataChanged(!isCourseDataChanged);
    };
    getCourseInfo();
  }, [params]);
  console.log(courseContent);
  console.log(moduleContent);

  // const getCourseInfo = async () => {
  //   // const data = await getCoursebyName(params?.id);
  //   const data =
  //   if (data) {
  //     setcourseContent(data ? data : {});
  //     setModuleContent(data?.module ? data?.module : []);
  //     setCurrentChapter(data?.module[0]?.chapter[0]);
  //     setcurrentModule(data?.module[0]);
  //     setisCourseDataChanged(!isCourseDataChanged);
  //     await checkModuleCoursesStatus({ module: data?.module[0] });

  //     if (loggedInUserData?._id && !data?.usersEnrolled.includes(loggedInUserData._id)) {
  //       toast("Please enroll course before proceeding", {
  //         icon: "🌟",
  //       });
  //       navigate(-1);
  //     }
  //     await getUserProgress();
  //     await checkChapterStatus({ chapter: data?.module[0]?.chapter[0] });
  //   }
  // };

  const handleChapterClick = async (chapter) => {
    setCurrentChapter(chapter._id === currentChapter._id ? currentChapter : chapter);
  };

  // const handleCompleteChapter = async ({ chapter }) => {
  //   const updatedProgress = userCourseProgress.modules.map((progressModule) => {
  //     const updatedChapters = progressModule.chapters.map((progressChapter) => {
  //       if (progressChapter._id === chapter._id) {
  //         // Update the chapter status
  //         return { ...progressChapter, status: "full" };
  //       }
  //       return progressChapter;
  //     });
  //     // Check if all chapters are full in the updated module
  //     const isChapterFull = updatedChapters.every((c) => c.status === "full");

  //     const updatedModule = {
  //       ...progressModule,
  //       chapters: updatedChapters,
  //       chapterStatus: isChapterFull ? "full" : progressModule.chapterStatus,
  //     };

  //     return updatedModule;
  //   });

  //   // setuserCourseProgress({ ...userCourseProgress, modules: updatedProgress });
  //   const updatesUserPorgress = {
  //     ...userCourseProgress,
  //     modules: updatedProgress,
  //   };

  //   const updatedUserProgress = await updateCourseProgressAPI({
  //     updatesUserPorgress,
  //     courseId: courseContent?._id,
  //     userId: loggedInUserData?._id,
  //     accessToken: loggedInUserData?.accessToken,
  //   });
  //   setuserCourseProgress(updatedUserProgress.updatedProgress);

  //   checkChapterStatus({ chapter });
  //   await checkModuleCoursesStatus({ currentModule });
  // };

  // const checkChapterStatus = async ({ chapter }) => {
  //   await userCourseProgress?.modules?.map((progressModule) => {
  //     progressModule?.chapters?.map((progressChapter) => {
  //       if (progressChapter?._id === chapter._id) {
  //         setcurrentChapterStatus(progressChapter.status);
  //       }
  //     });
  //   });
  // };

  // const checkModuleCoursesStatus = async ({ module }) => {
  //   const data = await userCourseProgress?.modules?.map((progressModule) => {
  //     if (progressModule?._id == module?._id) {
  //       if (progressModule?.chapterStatus == "full") {
  //         return true;
  //       }
  //     }
  //   });
  //   return data;

  // useEffect(() => {
  //   checkChapterStatus({ chapter: currentChapter });
  //   checkModuleCoursesStatus({ module: moduleContent[0] });
  // }, [userCourseProgress, currentChapter]);

  // useEffect(() => {
  //   getCourseInfo();
  //   const handleResize = () => {
  //     setScreenWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);


  if (isMobile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-4">
          <h1 className=" font-bold text-shardeumBlue font-helvetica-neue-bold text-[48px]">
            Better Experience on Desktop
          </h1>
          <p className="font-helvetica-neue-roman fon-[30px]">
            Please open this website on a desktop for a better experience.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  mt-[10vh] h-full flex justify-between align-middle">
      <Toaster />
      <ScrollToTop />
      {/* <NftModal
        toast={toast}
        userCourseProgress={userCourseProgress}
        courseId={courseContent?._id}
        courseName={courseContent?.title}
        userId={loggedInUserData?._id}
        accessToken={loggedInUserData?.accessToken}
        loggedInUserData={loggedInUserData}
        isOpen={nftModalIsOpen}
        setIsOpen={setnftModalIsOpen}
      /> */}
      <div className="bg-shardeumBlue px-[15px] py-[48px] lg:w-[25%] md:w-[30%] sm:w-[30%] fixed h-[90vh] left-0 flex flex-col align-middle items-center scroll-m-0 overflow-y-auto">
        <div className="">
          <div>
            <img
              className="rounded-lg "
              src={
                courseContent?.banner?.data[0].attributes?.url
                  ? courseContent?.banner?.data[0].attributes?.url
                  : "https://coinviet.net/wp-content/uploads/2022/11/2-16.png"
              }
              alt=""
            />
          </div>
          <p className="text-white text-[24px] font-helvetica-neue-bold text-center mt-2">{courseContent?.title}</p>
          <div className="mt-10">
            {moduleContent?.map((module, index) => (
              <div key={index}>
                <PreviewCourseAcc
                  moduleIndex={index}
                  setisModuleChanged={setisModuleChanged}
                  isModuleChanged={isModuleChanged}
                  // handleCompleteChapter={handleCompleteChapter}
                  module={module}
                  className="mt-10"
                  setCurrentChapter={setCurrentChapter}
                  currentChapter={currentChapter}
                  setcurrentModule={setcurrentModule}
                  currentModule={currentModule}
                  handleChapterClick={handleChapterClick}
                  isQuizSelected={isQuizSelected}
                  setisQuizSelected={setisQuizSelected}
                  userCourseProgress={userCourseProgress}
                  setcurrentModuleAllChapterStatus={setcurrentModuleAllChapterStatus}
                  currentModuleAllChapterStatus={currentModuleAllChapterStatus}
                  // checkModuleCoursesStatus={checkModuleCoursesStatus}
                  // setuserCourseProgress={setuserCourseProgress}
                  setcurrentQuiz={setcurrentQuiz}
                  currentQuiz={currentQuiz}
                />
              </div>
            ))}
          </div>

          <button
            disabled={currentCourseProgress?.overallCompletionPercentage === 100 ? false : true}
            onClick={() => setnftModalIsOpen(true)}
            className={`${currentCourseProgress?.overallCompletionPercentage === 100
              ? "bg-shardeumWhite text-black  hover:scale-105"
              : "text-white border-2 border-shardeumGreen"
              }   rounded-[10px] font-semibold h-[50px] flex justify-center  px-[32px] py-[22px]  transition ease-in-out items-center  align-middle   text-[18px] w-full text-center mt-2`}
          >
            Claim your reward 🔥
          </button>
        </div>
      </div>
      <div className="ml-[25%]   w-full flex flex-col justify-center items-center">

        {/* <CourseProgress title={courseContent?.title} currentCourseProgress={currentCourseProgress} /> */}
        <div className="flex w-full  my-10 m-0 justify-center items-center align-middle">
          {isQuizSelected ? (
            <div className="flex w-full text-[20px] md:px-[120px] px-[80px] courseContent justify-center align-middle  flex-col ">
              <PreviewQuiz
                courseId={courseContent?._id}
                userId={loggedInUserData?._id}
                accessToken={loggedInUserData?.accessToken}
                currentModule={currentModule}
                setuserCourseProgress={setuserCourseProgress}
                userCourseProgress={userCourseProgress}
                isModuleChanged={isModuleChanged}
                moduleQuiz={currentModule?.quizzes ? currentModule?.quizzes : []}
              />
            </div>
          ) : (
            currentChapter && (
              <DisplayChapter
                currentModule={currentModule}
                currentChapter={currentChapter}
                setCurrentChapter={setCurrentChapter}
                setisQuizSelected={setisQuizSelected}
                currentChapterStatus={currentChapterStatus}
                userCourseProgress={userCourseProgress}
                setuserCourseProgress={setuserCourseProgress}
                loggedInUserData={loggedInUserData}
                // checkChapterStatus={checkChapterStatus}
                // checkModuleCoursesStatus={checkModuleCoursesStatus}
                courseId={courseContent?._id}
                setcurrentChapterStatus={setcurrentChapterStatus}
                setcurrentQuiz={setcurrentQuiz}
                accessToken={loggedInUserData?.accessToken}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}