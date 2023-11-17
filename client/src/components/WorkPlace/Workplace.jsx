import React, { useContext, useEffect, useRef, useState } from "react";
import image from "../../assets/courseimage.png";
import CourseAcordian from "../CourseAcoridan/CourseAcordian";
import axios from "axios";
import hljs from "highlight.js";
import HTMLRenderer from "react-html-renderer";
import { useParams } from "react-router-dom";
import { courseProgressAPI, getCoursebyName, updateCourseProgressAPI } from "../../utils/api/CourseAPI";
import { CustomFigure } from "./customCourseElement";
import ReactPlayer from "react-player";
import "./WorkPlace.scss";
import Quiz from "../Quiz/Quiz";
import { ParentContext } from "../../contexts/ParentContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { OrangeButton } from "../button/OrangeButton";
import whiteExpand from "../../assets/whiteArrow.svg";
import ScrollToTop from "../../ScrollToTop";
import NftModal from "./NftModal";

export default function WorkPlace() {
  const params = useParams();
  const navigate = useNavigate();
  const { loggedInUserData } = useContext(ParentContext);

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

  const getUserProgress = async () => {
    const data = await courseProgressAPI({
      courseId: courseContent?._id,
      accessToken: loggedInUserData?.accessToken,
      userId: loggedInUserData?._id,
    });

    setuserCourseProgress(data?.enrolledCourse);
  };

  const getCourseInfo = async () => {
    const data = await getCoursebyName(params?.id);
    if (data) {
      setcourseContent(data ? data : {});
      setModuleContent(data?.module ? data?.module : []);
      setCurrentChapter(data?.module[0]?.chapter[0]);
      setcurrentModule(data?.module[0]);
      setisCourseDataChanged(!isCourseDataChanged);
      await checkModuleCoursesStatus({ module: data?.module[0] });

      if (loggedInUserData?._id && !data?.usersEnrolled.includes(loggedInUserData._id)) {
        toast("Please enroll course before proceeding", {
          icon: "🌟",
        });
        navigate(-1);
      }
      await getUserProgress();
      await checkChapterStatus({ chapter: data?.module[0]?.chapter[0] });
    }
  };

  // console.log(moduleContent);

  const handleChapterClick = async (chapter) => {
    // await checkChapterStatus({ chapter });
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
    const updatesUserPorgress = { ...userCourseProgress, modules: updatedProgress };

    const updatedUserProgress = await updateCourseProgressAPI({
      updatesUserPorgress,
      courseId: courseContent?._id,
      userId: loggedInUserData?._id,
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

  // console.log(currentModuleAllChapterStatus);

  const handleNextChapterClick = async ({ chapter }) => {
    let chapterIndex = currentModule?.chapter.findIndex((c) => c._id == chapter._id);
    console.log(chapterIndex, "check");
    if (chapterIndex == currentModule?.chapter.length - 1) {
      setisQuizSelected(true);
      setcurrentQuiz(currentModule?.quizzes);
      window.scrollTo(0, 0);
    } else {
      setCurrentChapter(currentModule?.chapter[chapterIndex + 1]);
      window.scrollTo(0, 0);
    }
  };
  const handlePrevChapterClick = async ({ chapter }) => {
    let chapterIndex = currentModule?.chapter.findIndex((c) => c._id == chapter._id);
    console.log(chapterIndex, "check");
    if (chapterIndex == 0) {
      console.log("no button");
      window.scrollTo(0, 0);
    } else {
      setCurrentChapter(currentModule?.chapter[chapterIndex - 1]);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    checkChapterStatus({ chapter: currentChapter });
    checkModuleCoursesStatus({ module: moduleContent[0] });
  }, [userCourseProgress, currentChapter]);

  useEffect(() => {
    getCourseInfo();
  }, []);

  useEffect(() => {
    getUserProgress();
  }, [loggedInUserData, moduleContent]);

  useEffect(() => {
    hljs.highlightAll();
  }, [moduleContent]);

  return (
    <div className="w-full mt-[10vh] h-full flex justify-between align-middle">
      <ScrollToTop />
      <NftModal loggedInUserData={loggedInUserData} isOpen={nftModalIsOpen} setIsOpen={setnftModalIsOpen} />
      <div className="bg-shardeumBlue px-[15px] py-[48px] lg:w-[25%] md:w-[30%] sm:w-[30%] fixed h-[90vh] left-0 flex flex-col align-middle items-center scroll-m-0 overflow-y-auto">
        <div className="">
          <div>
            <img
              className="rounded-lg"
              src={
                courseContent?.banner
                  ? courseContent?.banner
                  : "https://coinviet.net/wp-content/uploads/2022/11/2-16.png"
              }
              alt=""
            />
          </div>
          <p className="text-white text-[24px] text-center mt-2">{courseContent?.title}</p>
          <div className="mt-10">
            {moduleContent?.map((module, index) => (
              <div key={index}>
                <CourseAcordian
                  moduleIndex={index}
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
          <button onClick={() => setnftModalIsOpen(true)} className="text-white text-[24px] w-full text-center mt-2">
            Claim your reward
          </button>
        </div>
      </div>
      <div className="ml-[25%] w-[80%]">
        <div className="flex w-full bg- my-10 justify-center items-center align-middle">
          {isQuizSelected ? (
            <div className="flex text-[20px] w-[70%] courseContent justify-center align-middle  flex-col ">
              <Quiz
                courseId={courseContent?._id}
                userId={loggedInUserData?._id}
                currentModule={currentModule}
                setuserCourseProgress={setuserCourseProgress}
                userCourseProgress={userCourseProgress}
                isModuleChanged={isModuleChanged}
                moduleQuiz={currentModule?.quizzes ? currentModule?.quizzes : []}
              />
            </div>
          ) : (
            currentChapter && (
              <div className="flex text-[20px] w-[70%] courseContent justify-center align-middle  flex-col ">
                {currentModule?.chapter
                  .filter((chapter) => chapter._id === currentChapter._id)
                  .map((chapter) => (
                    <div className="w-full items-center">
                      <HTMLRenderer
                        html={chapter?.content}
                        components={{
                          figure: (props) => <CustomFigure {...props} />,
                        }}
                      />
                      <div className="w-full mt-10 flex justify-evenly align-middle items-center">
                        {currentModule?.chapter.findIndex((c) => c._id == chapter._id) == 0 ? (
                          <div></div>
                        ) : (
                          <button
                            onClick={() => {
                              handlePrevChapterClick({ chapter });
                            }}
                            className={`bg-shardeumOrange flex justify-evenly align-middle  hover:bg-[#ff7a2e] rounded-[10px] w-auto px-4 py-3  transition ease-in-out items-center font-semibold  text-center text-white text-[16px] `}
                          >
                            {/* {icon && <FontAwesomeIcon className="mr-3" icon={icon ? icon : ""} />} */}
                            <img className={`w-6 h-6 rotate-90 mr-2 items-center  fill-white `} src={whiteExpand} />
                            <span className="items-center text-center ">Previous</span>
                          </button>
                        )}

                        <button
                          disabled={currentChapterStatus == "full" ? true : false}
                          onClick={() => handleCompleteChapter({ chapter })}
                          className={`bg-shardeumOrange  hover:bg-[#ff7a2e] rounded-[10px] w-auto px-4 py-3  transition ease-in-out items-center font-semibold align-middle text-center text-white text-[18px] `}
                        >
                          <span className="items-center text-center ">Mark as complete</span>
                        </button>
                        {currentChapterStatus == "full" && (
                          <button
                            onClick={() => {
                              handleNextChapterClick({ chapter });
                            }}
                            className={`bg-shardeumOrange flex justify-evenly align-middle  hover:bg-[#ff7a2e] rounded-[10px] w-auto px-4 py-3  transition ease-in-out items-center font-semibold  text-center text-white text-[16px] `}
                          >
                            {/* {icon && <FontAwesomeIcon className="mr-3" icon={icon ? icon : ""} />} */}
                            <span className="items-center text-center ">Next</span>
                            <img className={`w-6 h-6 -rotate-90 ml-2 items-center  fill-white `} src={whiteExpand} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
