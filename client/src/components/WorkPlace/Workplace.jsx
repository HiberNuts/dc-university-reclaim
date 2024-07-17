import React, { useContext, useEffect, useState } from "react";
import CourseAcordian from "../CourseAcoridan/CourseAcordian.jsx";

import { useParams } from "react-router-dom";
import { courseProgressAPI, getCoursebyName, updateCourseProgressAPI } from "../../utils/api/CourseAPI";
import "./WorkPlace.scss";
import Quiz from "../Quiz/Quiz";
import { ParentContext } from "../../contexts/ParentContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ScrollToTop from "../../ScrollToTop";
import NftModal from "./component/NftModal";
import { getUserCourseProgressPercentage } from "../../utils/api/CourseAPI";
import DisplayChapter from "./component/DisplayChapter";
import WorkPlaceProgram from "./Program/Program.jsx";

export default function WorkPlace() {
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
  const [isProgramSelected,setIsProgramSelected]=useState(true);
  const [currentChapterStatus, setcurrentChapterStatus] = useState("none");
  const [currentModuleAllChapterStatus, setcurrentModuleAllChapterStatus] = useState("none");
  const [currentQuiz, setcurrentQuiz] = useState([]);
  const [nftModalIsOpen, setnftModalIsOpen] = useState(false);
  const [currentCourseProgress, setcurrentCourseProgress] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isMobile = screenWidth < 768;

  const getUserProgress = async () => {
    const data = await courseProgressAPI({
      courseId: courseContent?._id,
      accessToken: loggedInUserData?.accessToken,
      userId: loggedInUserData?._id,
    });

    setuserCourseProgress(data?.enrolledCourse);
  };

  const getProgressPercentage = async () => {
    try {
      const data = await getUserCourseProgressPercentage({
        courseId: courseContent?._id,
        userId: loggedInUserData?._id,
        accessToken: loggedInUserData?.accessToken,
      });
      setcurrentCourseProgress(data);
    } catch (error) {
      console.error("Error fetching course progress:", error);
    }
  };

  useEffect(() => {
    getProgressPercentage();
  }, [courseContent, userCourseProgress]);

  const getCourseInfo = async () => {
    const data = await getCoursebyName(params?.id);
    if (data) {
      setcourseContent(data ? data : {});
      setModuleContent(data?.module ? data?.module : []);
      setCurrentChapter(data?.module[0]?.chapter[0]);
      setcurrentModule(data?.module[0]);
      setisCourseDataChanged(!isCourseDataChanged);
      await checkModuleCoursesStatus({ module: data?.module[0] });

      await getUserProgress();
      await checkChapterStatus({ chapter: data?.module[0]?.chapter[0] });
    }
  };

  const handleChapterClick = async (chapter) => {
    setCurrentChapter(chapter._id === currentChapter._id ? currentChapter : chapter);
  };

  const handleCompleteChapter = async ({ chapter }) => {
    const updatedProgress = userCourseProgress.modules.map((progressModule) => {
      const updatedChapters = progressModule.chapters.map((progressChapter) => {
        if (progressChapter._id === chapter._id) {
          // Update the chapter status
          return { ...progressChapter, status: "full" };
        }
        return progressChapter;
      });
      // Check if all chapters are full in the updated module
      const isChapterFull = updatedChapters.every((c) => c.status === "full");

      const updatedModule = {
        ...progressModule,
        chapters: updatedChapters,
        chapterStatus: isChapterFull ? "full" : progressModule.chapterStatus,
      };

      return updatedModule;
    });

    // setuserCourseProgress({ ...userCourseProgress, modules: updatedProgress });
    const updatesUserPorgress = {
      ...userCourseProgress,
      modules: updatedProgress,
    };

    const updatedUserProgress = await updateCourseProgressAPI({
      updatesUserPorgress,
      courseId: courseContent?._id,
      userId: loggedInUserData?._id,
      accessToken: loggedInUserData?.accessToken,
    });
    setuserCourseProgress(updatedUserProgress.updatedProgress);

    checkChapterStatus({ chapter });
    await checkModuleCoursesStatus({ currentModule });
  };

  const checkChapterStatus = async ({ chapter }) => {
    await userCourseProgress?.modules?.map((progressModule) => {
      progressModule?.chapters?.map((progressChapter) => {
        if (progressChapter?._id === chapter._id) {
          setcurrentChapterStatus(progressChapter.status);
        }
      });
    });
  };

  const checkModuleCoursesStatus = async ({ module }) => {
    const data = await userCourseProgress?.modules?.map((progressModule) => {
      if (progressModule?._id == module?._id) {
        if (progressModule?.chapterStatus == "full") {
          return true;
        }
      }
    });
    return data;
  };

  useEffect(() => {
    checkChapterStatus({ chapter: currentChapter });
    checkModuleCoursesStatus({ module: moduleContent[0] });
  }, [userCourseProgress, currentChapter]);

  useEffect(() => {
    getCourseInfo();
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getUserProgress();
  }, [loggedInUserData, moduleContent]);

  return (
    <div className="w-full  mt-[10vh] h-full flex justify-between align-middle">
      <Toaster />
      <ScrollToTop />
      <NftModal
        toast={toast}
        nftImage={courseContent?.nftImage}
        userCourseProgress={userCourseProgress}
        courseId={courseContent?._id}
        courseName={courseContent?.title}
        userId={loggedInUserData?._id}
        accessToken={loggedInUserData?.accessToken}
        loggedInUserData={loggedInUserData}
        isOpen={nftModalIsOpen}
        setIsOpen={setnftModalIsOpen}
      />

      <div className={`bg-shardeumBlue z-20 px-[15px] py-[48px] lg:w-[25%] md:w-[30%] sm:w-[100%] fixed h-[90vh] left-0 flex flex-col align-middle items-center scroll-m-0 overflow-y-scroll $ ${isMobile ? `${sidebarOpen ? 'block' : 'hidden'} ` : 'h-[90vh]'}`}>
        <div className="">
          <div>
            <img
              className="rounded-lg "
              src={
                courseContent?.banner
                  ? courseContent?.banner
                  : "https://coinviet.net/wp-content/uploads/2022/11/2-16.png"
              }
              alt=""
            />
          </div>
          <p className="text-white text-[24px] font-helvetica-neue-bold text-center mt-2">{courseContent?.title}</p>
          <div className="mt-10">
            {moduleContent?.map((module, index) => (
              <div key={index}>
                <CourseAcordian
                  moduleIndex={index}
                  setSidebarOpen={setSidebarOpen}
                  sidebarOpen={sidebarOpen}
                  setisModuleChanged={setisModuleChanged}
                  isModuleChanged={isModuleChanged}
                  handleCompleteChapter={handleCompleteChapter}
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
                  checkModuleCoursesStatus={checkModuleCoursesStatus}
                  setuserCourseProgress={setuserCourseProgress}
                  setcurrentQuiz={setcurrentQuiz}
                  currentQuiz={currentQuiz}
                />
              </div>
            ))}
          </div>

          <button
            disabled={true}
            onClick={() => setnftModalIsOpen(true)}
            className="text-white border-2 border-shardeumGreen rounded-[10px] font-semibold h-[50px] flex justify-center  px-[32px] py-[22px]  transition ease-in-out items-center  align-middle   text-[18px] w-full text-center mt-2"
          >
            Claim your reward 🔥
          </button>
        </div>
      </div>
      <div className={`${isMobile ? 'px-8   mt-4' : 'ml-[25%] px-20 '} overflow-x-hidden w-full flex flex-col justify-center items-center`}>
        {isMobile && (
          <div className="toggle-sidebar-container w-full my-5 h-10">
            <button
              className="toggle-sidebar-button h-full w-full text-lg rounded-lg bg-shardeumGreen"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>
          </div>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <p className="text-black text-[24px] text-center mt-2">{courseContent?.title}</p>
          {currentCourseProgress && (
            <div className="w-full  rounded-full h-4 mb-6">
              <div className="relative  border-2 border-black h-4 w-full rounded-2xl">
                <div
                  style={{
                    width: `${parseInt(currentCourseProgress?.overallCompletionPercentage)}%`,
                  }}
                  className={`bg-shardeumRed h-full absolute z-0 top-0 left-0 flex items-center justify-center rounded-2xl text-sm font-semibold text-white`}
                ></div>
              </div>

              <div className="mt-2 font-helvetica-neue-roman">
                Course {parseInt(currentCourseProgress?.overallCompletionPercentage)}% Completed{" "}
              </div>
              <div style={{ height: '2px', backgroundColor: 'black', width: '100%', marginTop: "8px" }}></div>
            </div>
          )}
        </div>
        <div className="flex w-full  my-10 m-0 justify-center items-center align-middle">
          {
          isProgramSelected?
          <WorkPlaceProgram currentModule={currentModule} courseContent={courseContent}/>
           
          :
          isQuizSelected ? (
            <div className="flex w-full text-[20px] courseContent justify-center align-middle  flex-col ">
              <Quiz
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
                checkChapterStatus={checkChapterStatus}
                checkModuleCoursesStatus={checkModuleCoursesStatus}
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
