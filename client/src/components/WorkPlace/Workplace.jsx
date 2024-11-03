import React, { useContext, useEffect, useState } from "react";
import CourseAcordian from "../CourseAcoridan/CourseAcordian.jsx";
import { useParams } from "react-router-dom";
import { courseProgressAPI, getCoursebyName } from "../../utils/api/CourseAPI";
import "./WorkPlace.scss";
import Quiz from "../Quiz/Quiz";
import { ParentContext } from "../../contexts/ParentContext";
import toast, { Toaster } from "react-hot-toast";
import ScrollToTop from "../../ScrollToTop";
import NftModal from "./component/NftModal";
import { getUserCourseProgressPercentage } from "../../utils/api/CourseAPI";
import DisplayChapter from "./component/DisplayChapter";
import WorkPlaceProgram from "./Program/Program.jsx";
import { IoMdClose } from "react-icons/io";
export default function WorkPlace() {
  const params = useParams();
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
  const [isProgramSelected, setIsProgramSelected] = useState(false);
  const [isProgramSubmited, setIsProgramSubmited] = useState(false);
  const [currentChapterStatus, setcurrentChapterStatus] = useState("none");
  const [currentModuleAllChapterStatus, setcurrentModuleAllChapterStatus] = useState("none");
  const [currentQuiz, setcurrentQuiz] = useState([]);
  const [nftModalIsOpen, setnftModalIsOpen] = useState(false);
  const [currentCourseProgress, setcurrentCourseProgress] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isMobile = screenWidth < 1024;

  const getUserProgress = async () => {
    if (courseContent?._id && loggedInUserData?._id && loggedInUserData?.accessToken) {
      const data = await courseProgressAPI({
        courseId: courseContent?._id,
        accessToken: loggedInUserData?.accessToken,
        userId: loggedInUserData?._id,
      });
      if (data.enrolledCourse) {
        if (data.enrolledCourse.courseId === courseContent._id) {
          setuserCourseProgress(data.enrolledCourse || {});
        } else {
          toast.error("You are not enrolled in this course.");
        }
        setuserCourseProgress(data.enrolledCourse || {});
      }
    }

  };
  const getProgressPercentage = async () => {
    try {
      if (courseContent) {
        if (courseContent?._id && loggedInUserData?._id && loggedInUserData?.accessToken) {
          const data = await getUserCourseProgressPercentage({
            courseId: courseContent._id,
            userId: loggedInUserData._id,
            accessToken: loggedInUserData?.accessToken,
          });
          setcurrentCourseProgress(data);
        }
      }
    } catch (error) {
      console.error("Error fetching  course progress:", error);
    }
  };

  useEffect(() => {
    getProgressPercentage();
  }, [loggedInUserData, userCourseProgress]);

  const getCourseInfo = async () => {
    const data = await getCoursebyName(params?.id);
    if (data) {
      setcourseContent(data ? data : {});
      setModuleContent(data?.module ? data?.module : []);
      setCurrentChapter(data?.module[0]?.chapter[0]);
      setcurrentModule(data?.module[0]);
      setisCourseDataChanged(!isCourseDataChanged);
      await checkModuleCoursesStatus({ module: data?.module[0] });
      await checkChapterStatus({ chapter: data?.module[0]?.chapter[0] });
    }
  };

  const handleChapterClick = async (chapter) => {
    setCurrentChapter(chapter._id === currentChapter._id ? currentChapter : chapter);
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
    const init = async () => {
      await getUserProgress();
      await getCourseInfo();
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
    init()
  }, [loggedInUserData, params.id]);

  useEffect(() => {
    const init = async () => {
      await getUserProgress();
    }
    init()
  }, [isProgramSubmited, courseContent]);


  return (
    <div className="w-full  mt-8 px-1 md:px-10 h-full flex flex-row">
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

      <div className={`bg-[#121212] border-[0.1px] border-decentraBlue pb-20 rounded-lg z-20 p-3 md:p-6 lg:w-[20%] w-[100%]   min-h-[90vh]   flex flex-col  scroll-m-0 overflow-y-scroll $ ${isMobile ? `${sidebarOpen ? 'absolute block left-0' : 'hidden '} ` : 'fixed h-[90vh]'}`}>
        <div className="">
          <div>
            {/* <img
              className="rounded-lg "
              src={
                courseContent?.banner
                  ? courseContent?.banner
                  : "https://coinviet.net/wp-content/uploads/2022/11/2-16.png"
              }
              alt=""
            /> */}
          </div>
          {
            sidebarOpen &&
            <div className="absolute right-5">
              <IoMdClose className="text-white text-lg" onClick={() => setSidebarOpen(!sidebarOpen)} />
            </div>
          }
          <div className="overflow-hidden">
            <div className="hidden md:block size-[400px] rounded-full bg-[#3A59FE] overflow-hidden absolute pointer-events-none -top-40 left-0 z-0 blur-[100px] opacity-40"></div>
          </div>
          <div className="relative text-left w-fit mt-[-1.00px] 
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text text-wrap font-montserrat-semibold font-bold text-transparent text-md tracking-[0] leading-5 whitespace-nowrap">
            {courseContent?.title}
          </div>
          <div className="progress-bar py-5">
            {currentCourseProgress && (
              <div className="w-full  rounded-full h-4 mb-2">
                <div className="relative  border-2 border-[#3A59FE] h-3 w-full rounded-2xl">
                  <div
                    style={{
                      width: `${parseInt(currentCourseProgress?.overallCompletionPercentage)}%`,
                    }}
                    className={`bg-[#3A59FE] h-full absolute z-0 top-0 left-0 flex items-center justify-center rounded-2xl text-sm font-semibold text-white`}
                  ></div>
                </div>

                <div className="mt-2">
                  <p className="relative self-stretch font-gilroy text-white text-sm tracking-[0] leading-7">
                    Course {parseInt(currentCourseProgress?.overallCompletionPercentage)}% Completed{" "}
                  </p>
                </div>
                <div style={{ height: '2px', backgroundColor: 'black', width: '100%', marginTop: "8px" }}></div>
              </div>
            )}
          </div>
          <div className="mt-10">
            {moduleContent && moduleContent.map((module, index) => (
              <div key={index} className="">
                <CourseAcordian
                  moduleIndex={index}
                  setSidebarOpen={setSidebarOpen}
                  sidebarOpen={sidebarOpen}
                  setisModuleChanged={setisModuleChanged}
                  isModuleChanged={isModuleChanged}
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
                  setIsProgramSelected={setIsProgramSelected}
                  isProgramSelected={isProgramSelected}
                />
              </div>
            ))}
          </div>

          <button
            disabled={true}
            onClick={() => setnftModalIsOpen(true)}
            className="text-white  border-2 border-[#3A59FE] rounded-[10px] font-semibold h-[50px] flex justify-center  px-[32px] py-[22px]  transition ease-in-out items-center  align-middle   text-[18px] w-full text-center mt-5"
          >
            Claim your reward 🔥
          </button>
          <div className="md:h-20 relative">
            <div className="absulte overflow-hidden">
              <div className="hidden md:block size-[400px] rounded-full bg-[#3A59FE] overflow-hidden absolute pointer-events-none -top-20 left-[45%] z-0 blur-[200px] opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
      <div className={` ${isMobile ? 'px-2   mt-4' : `${isProgramSelected ? "ml-[25%]  px-1" : ' ml-[25%] '}`}   overflow-x-hidden w-full flex flex-col justify-center items-center`}>
        {isMobile && (
          <div className="toggle-sidebar-container w-full my-5 h-10">
            <button
              className="toggle-sidebar-button h-full w-full text-lg rounded-lg bg-[#3A59FE]"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? 'Close Menu' : 'Menu'}
            </button>
          </div>
        )}

        <div className="flex-1 flex w-full  m-0 justify-center items-center align-middle">
          {
            isProgramSelected ?
              <WorkPlaceProgram setuserCourseProgress={setuserCourseProgress}
                userCourseProgress={userCourseProgress} setIsProgramSubmited={setIsProgramSubmited} isProgramSubmited={isProgramSubmited} user_id={loggedInUserData._id} loggedInUserData={loggedInUserData} currentModule={currentModule} courseContent={courseContent} />
              :
              isQuizSelected ? (
                <div className="flex w-full text-[20px] courseContent justify-center align-middle  flex-col ">
                  <Quiz
                    setIsProgramSelected={setIsProgramSelected}
                    isProgramSelected={isProgramSelected}
                    handleChapterClick={handleChapterClick}
                    courseId={courseContent?._id}
                    userId={loggedInUserData?._id}
                    accessToken={loggedInUserData?.accessToken}
                    currentModule={currentModule}
                    setuserCourseProgress={setuserCourseProgress}
                    userCourseProgress={userCourseProgress}
                    setisQuizSelected={setisQuizSelected}
                    setisModuleChanged={setisModuleChanged}
                    isModuleChanged={isModuleChanged}
                    moduleQuiz={currentModule?.quizzes ? currentModule?.quizzes : []}
                    setCurrentChapter={setCurrentChapter}
                    currentChapterStatus={currentChapterStatus}
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
