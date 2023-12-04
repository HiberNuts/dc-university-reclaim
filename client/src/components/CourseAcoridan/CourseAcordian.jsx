import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Acordian.scss";
import whiteExpand from "../../assets/whiteArrow.svg";
import lock from "../../assets/lock.svg";
import tick from "../../assets/tick.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AccordionContext = React.createContext({});
const useAccordion = () => React.useContext(AccordionContext);

function Accordion({ children, multiple, defaultIndex }) {
  const childrenArray = React.Children.toArray(children);
  const allIndices = childrenArray.map((_, index) => index);
  const [activeIndex, setActiveIndex] = React.useState(multiple ? [defaultIndex] : 0);

  function onChangeIndex(index) {
    setActiveIndex((currentActiveIndex) => {
      if (!multiple) {
        return index === activeIndex ? -1 : index;
      }

      if (currentActiveIndex.includes(index)) {
        return currentActiveIndex.filter((i) => i !== index);
      }

      return currentActiveIndex.concat(index);
    });
  }

  return React.Children.map(children, (child, index) => {
    const isActive = multiple && Array.isArray(activeIndex) ? activeIndex.includes(index) : activeIndex === index;

    return <AccordionContext.Provider value={{ isActive, index, onChangeIndex }}>{child}</AccordionContext.Provider>;
  });
}

const LockIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <rect x="0.7" y="0.70061" width="22.6006" height="22.6006" rx="11.3003" fill="white" />
      <rect x="0.7" y="0.70061" width="22.6006" height="22.6006" rx="11.3003" stroke="black" stroke-width="1.4" />
      <path
        d="M7.82601 18.5735H16.1735C16.5192 18.5735 16.7995 18.2932 16.7995 17.9474V10.8521C16.7995 10.5063 16.5192 10.226 16.1735 10.226H15.5474V8.34784C15.5474 6.39166 13.9559 4.80017 11.9997 4.80017C10.0436 4.80017 8.45207 6.39166 8.45207 8.34784V10.226H7.82601C7.48026 10.226 7.19995 10.5063 7.19995 10.8521V17.9474C7.19995 18.2932 7.48026 18.5735 7.82601 18.5735ZM12.6258 14.6078V15.4432C12.6258 15.7889 12.3455 16.0692 11.9997 16.0692C11.654 16.0692 11.3737 15.7889 11.3737 15.4432V14.6078C11.1204 14.4173 10.9563 14.1143 10.9563 13.7737C10.9563 13.1983 11.4244 12.7303 11.9997 12.7303C12.5751 12.7303 13.0432 13.1983 13.0432 13.7737C13.0432 14.1143 12.8791 14.4173 12.6258 14.6078ZM9.70419 8.34784C9.70419 7.08207 10.734 6.05229 11.9997 6.05229C13.2655 6.05229 14.2953 7.08207 14.2953 8.34784V10.226H9.70419V8.34784Z"
        fill="#3042FB"
      />
    </svg>
  );
};

const TickIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <rect x="0.7" y="0.7" width="22.6" height="22.6" rx="11.3" fill="#A4FF00" />
      <rect x="0.7" y="0.7" width="22.6" height="22.6" rx="11.3" stroke="black" stroke-width="1.4" />
      <path
        d="M16.2352 9.38831L10.4117 15.3177L7.76465 12.6225"
        stroke="black"
        stroke-width="1.69412"
        stroke-linecap="square"
      />
    </svg>
  );
};

function AccordionItem({ children }) {
  return <div className="AccordionItem bg-transparent  text-white text-[18px] font-[800px]">{children}</div>;
}

function AccordionHeader({ text }) {
  const { isActive, index, onChangeIndex } = useAccordion();

  return (
    <motion.div
      className={`py-2 px-0 border-b-2 border-white bg-shardeumBlue ${isActive ? "active" : ""} w-full`}
      onClick={() => onChangeIndex(index)}
    >
      <div className="flex w-full justify-between align-middle h-full">
        <span className="font-helvetica-neue-roman text-[18px]">{text}</span>
        <img
          className={` sm:w-[25px] h-[25px]  mt-3  sm:mt-0 transition-transform duration-300 ${
            isActive ? "rotate-0" : "rotate-180"
          }`}
          src={whiteExpand}
          alt="Expand"
        />
      </div>
    </motion.div>
  );
}

function AccordionPanel({ children }) {
  const { isActive } = useAccordion();

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
        >
          <div className="AccordionPanel mt-2 bg-shardeumBlue text-white font-helvetica-neue-roman text-[16px]">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const CourseAcordian = ({
  module,
  currentChapter,
  setcurrentModule,
  handleChapterClick,
  setisModuleChanged,
  isModuleChanged,
  setisQuizSelected,
  isQuizSelected,
  userCourseProgress,
  setuserCourseProgress,
  moduleIndex,
  currentModuleAllChapterStatus,
  setcurrentModuleAllChapterStatus,
  checkModuleCoursesStatus,
  currentModule,
  currentQuiz,
  setcurrentQuiz,
}) => {
  const navigate = useNavigate();
  const [courseStatus, setcourseStatus] = useState("");

  const handleCompleteChapter = async ({ chapter }) => {
    const updatedProgress = await userCourseProgress.modules.map((progressModule) => {
      const updatedChapters = progressModule.chapters.map((progressChapter) => {
        if (progressChapter._id === chapter._id) {
          // Update the chapter status
          return { ...progressChapter, status: "partial" };
        }
        return progressChapter;
      });
      // Check if all chapters are full in the updated module

      const updatedModule = {
        ...progressModule,
        chapters: updatedChapters,
      };
      // console.log(updatedModule);
      return updatedModule;
    });

    setuserCourseProgress({ ...userCourseProgress, modules: updatedProgress });
  };
  // console.log(userCourseProgress);
  if (userCourseProgress?.modules) {
    return (
      <div className="courseAcc">
        <Accordion>
          <AccordionItem key={"i"}>
            <AccordionHeader text={module?.moduleTitle} />
            <AccordionPanel className="bg-shardeumBlue">
              {module?.chapter.map((chapter, i) => {
                let disabled = false;
                if (userCourseProgress?.modules) {
                  if (moduleIndex == 0) {
                    if (i == 0) {
                      disabled = false;

                      if (userCourseProgress?.modules[moduleIndex ? moduleIndex : 0]?.chapters[0]?.status == "none") {
                        handleCompleteChapter({ chapter: userCourseProgress?.modules[moduleIndex]?.chapters[0] });
                      }
                    } else {
                      disabled =
                        userCourseProgress?.modules[moduleIndex]?.chapters[i - 1]?.status !== "full" ? true : false;
                    }
                  } else {
                    if (
                      userCourseProgress?.modules[moduleIndex - 1 ? moduleIndex - 1 : 0]?.status === "full" &&
                      userCourseProgress?.modules[moduleIndex]?.chapters[0]?.status == "none"
                    ) {
                      handleCompleteChapter({ chapter: userCourseProgress?.modules[moduleIndex]?.chapters[0] });
                    }
                    disabled = userCourseProgress?.modules[moduleIndex - 1]?.status == "full" ? false : true;
                  }
                }

                return (
                  <div>
                    <button
                      disabled={disabled}
                      key={i}
                      onClick={() => {
                        setisQuizSelected(false);
                        handleChapterClick(chapter);
                        checkModuleCoursesStatus({ module });
                        setcurrentModule(module);
                        setisModuleChanged(!isModuleChanged);
                        window.scroll(0, 0);
                      }}
                    >
                      <div className="flex items-center pt-2  mr-4">
                        {userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status === "full" ? (
                          <div className="rounded-full items-center w-[30px] h-[30px]">
                            <TickIcon />
                          </div>
                        ) : userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status === "partial" ? (
                          <div
                            className={`rounded-full ${
                              isQuizSelected
                                ? "text-white border-2 border-white"
                                : chapter._id == currentChapter._id
                                ? "border-2 bg-white border-black"
                                : "border-2 bg-white border-black"
                            } bg-shardeumBlue  w-[30px] h-[30px]`}
                          ></div>
                        ) : userCourseProgress?.modules[moduleIndex]?.chapters[i - 1]?.status !== "full" ? (
                          <div className="rounded-full items-center w-[30px] h-[30px]">
                            <LockIcon />
                          </div>
                        ) : (
                          <div
                            className={`rounded-full ${
                              isQuizSelected
                                ? "text-white border-2 border-white"
                                : chapter._id == currentChapter._id
                                ? "border-2 bg-white border-black"
                                : "border-2 bg-white border-black"
                            }   w-[30px] h-[30px]`}
                          ></div>
                        )}

                        <label
                          htmlFor="red-checkbox"
                          className={`ml-2 font-helvetica-neue-md text-[16px] items-start text-start ${
                            isQuizSelected
                              ? "text-white"
                              : chapter._id == currentChapter._id
                              ? "border-b-2 border-shardeumGreen"
                              : `${
                                  userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status !== "full" ||
                                  userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status !== "none"
                                    ? "text-white"
                                    : "text-white "
                                }`
                          } cursor-pointer   `}
                        >
                          {chapter?.title}
                        </label>
                      </div>
                    </button>
                  </div>
                );
              })}
              <RenderQuiz
                module={module}
                isModuleChanged={isModuleChanged}
                setisQuizSelected={setisQuizSelected}
                isQuizSelected={isQuizSelected}
                setcurrentModule={setcurrentModule}
                setisModuleChanged={setisModuleChanged}
                currentModuleAllChapterStatus={currentModuleAllChapterStatus}
                checkModuleCoursesStatus={checkModuleCoursesStatus}
                userCourseProgress={userCourseProgress}
                currentModule={currentModule}
                setcurrentQuiz={setcurrentQuiz}
                currentQuiz={currentQuiz}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
};

const RenderQuiz = ({
  module,
  setisQuizSelected,
  isModuleChanged,
  isQuizSelected,
  setcurrentModule,
  setisModuleChanged,
  currentModuleAllChapterStatus,
  userCourseProgress,
  currentModule,
  currentQuiz,
  setcurrentQuiz,
  setcurrentModuleAllChapterStatus,
}) => {
  // const [currentModuleStatus, setcurrentModuleStatus] = useState("");

  const [quizStatus, setquizStatus] = useState("");
  const handleQuizClick = (module) => {};

  const [currentChaptersStatus, setcurrentChaptersStatus] = useState("none");

  const checkModuleCoursesStatus = async ({ module }) => {
    const data = await userCourseProgress?.modules?.map((progressModule) => {
      if (progressModule?._id == module?._id) {
        setcurrentChaptersStatus(progressModule?.chapterStatus);
        setquizStatus(progressModule?.quizStatus);
      }
    });
  };

  useEffect(() => {
    checkModuleCoursesStatus({ module });
  }, [userCourseProgress]);

  return (
    <div>
      <button
        disabled={currentChaptersStatus == "full" ? false : true}
        onClick={() => {
          setisQuizSelected(true);
          setcurrentModule(module);
          setcurrentQuiz(module?.quizzes);
          setisModuleChanged(!isModuleChanged);
        }}
      >
        <div className="flex items-center pt-2  mr-4">
          {currentChaptersStatus == "none" ? (
            <div className="rounded-full items-center w-[30px] h-[30px]">
              <LockIcon />
            </div>
          ) : quizStatus == "full" ? (
            <div className="rounded-full  w-[30px] h-[30px]">
              <TickIcon />
            </div>
          ) : (
            <div
              className={`rounded-full ${
                isQuizSelected &&
                currentModule?.quizzes[0]?._id == currentQuiz[0]?._id &&
                module._id == currentModule._id
                  ? "border-2 border-black bg-white"
                  : "border-2 border-black bg-white "
              } bg-shardeumBlue  w-[30px] h-[30px]`}
            ></div>
          )}

          <label
            htmlFor="red-checkbox"
            className={`ml-2 text-[16px] items-start text-start ${
              isQuizSelected && currentModule?.quizzes[0]?._id == currentQuiz[0]?._id && module._id == currentModule._id
                ? "text-shardeumOrange font-bold"
                : "text-white"
            }    cursor-pointer`}
          >
            Quiz
          </label>
        </div>
      </button>
    </div>
  );
};

export default CourseAcordian;
