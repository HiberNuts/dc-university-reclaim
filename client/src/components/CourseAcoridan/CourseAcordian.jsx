import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Acordian.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import whiteExpand from "../../assets/whiteArrow.svg";
import expand from "../../assets/expand.png";
import lock from "../../assets/lock.svg";
import tick from "../../assets/tick.svg";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../utils/generateSlug";
import { useEffect } from "react";

const AccordionContext = React.createContext({});
const useAccordion = () => React.useContext(AccordionContext);

function Accordion({ children, multiple, defaultIndex }) {
  const [activeIndex, setActiveIndex] = React.useState(multiple ? [defaultIndex] : defaultIndex);

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

function AccordionItem({ children }) {
  return <div className="AccordionItem  text-white font-satoshi text-[18px] font-[800px]">{children}</div>;
}

function AccordionHeader({ text }) {
  const { isActive, index, onChangeIndex } = useAccordion();

  return (
    <motion.div className={`AccordionHeader ${isActive ? "active" : ""} w-full `} onClick={() => onChangeIndex(index)}>
      <div style={{ fontFamily: "satoshiVariable" }} className="flex  w-full justify-between align-middle h-full">
        <span style={{ fontFamily: "satoshiVariable" }} className="font-[500] text-[16px]">
          {text}
        </span>{" "}
        <img
          className={`${
            isActive ? "rotate-180 transition-all ease-in-out duration-500 " : ""
          } w-6 sm:w-[25px] h-[25px]  mt-3 ml-2 fill-white sm:mt-0 sm:ml-0 `}
          src={whiteExpand}
        />
        {/* <FontAwesomeIcon icon={lockSVG} /> */}
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
          <div className="AccordionPanel   bg-shardeumBlue text-white">{children}</div>
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
  if (userCourseProgress) {
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
                    // console.log(userCourseProgress?.modules[moduleIndex]?.chapters[0]?.status);

                    // disabled = userCourseProgress?.modules[moduleIndex - 1]?.status == "full" ? false : true
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
                      }}
                    >
                      <div className="flex items-center pt-2  mr-4">
                        {/* {i == 0 ? (
                          userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status === "full" ? (
                            <div className="rounded-full bg-white items-center w-[25px] h-[25px]">
                              <img className="w-full h-full" src={tick} />
                            </div>
                          ) : (
                            <div></div>
                          )
                        ) : (
                          <div></div>
                        )} */}

                        {userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status === "full" ? (
                          <div className="rounded-full bg-white items-center w-[25px] h-[25px]">
                            <img className="w-full h-full" src={tick} />
                          </div>
                        ) : userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status === "partial" ? (
                          <div
                            className={`rounded-full ${
                              isQuizSelected
                                ? "text-white"
                                : chapter._id == currentChapter._id
                                ? "border-2 border-shardeumOrange"
                                : "border-2 border-white "
                            } bg-shardeumBlue  w-[25px] h-[25px]`}
                          ></div>
                        ) : userCourseProgress?.modules[moduleIndex]?.chapters[i - 1]?.status !== "full" ? (
                          <div className="rounded-full bg-white items-center w-[25px] h-[25px]">
                            <img className="w-full h-full" src={lock} />
                          </div>
                        ) : (
                          <div
                            className={`rounded-full ${
                              isQuizSelected
                                ? "text-white"
                                : chapter._id == currentChapter._id
                                ? "border-2 border-shardeumOrange"
                                : "border-2 border-white "
                            } bg-shardeumBlue  w-[25px] h-[25px]`}
                          ></div>
                        )}

                        <label
                          htmlFor="red-checkbox"
                          className={`ml-2 text-[16px] items-start text-start ${
                            isQuizSelected
                              ? "text-white"
                              : chapter._id == currentChapter._id
                              ? "text-shardeumOrange  font-bold"
                              : `${
                                  userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status !== "full" ||
                                  userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status !== "none"
                                    ? "text-gray-300"
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
  console.log(currentQuiz);

  useEffect(() => {
    checkModuleCoursesStatus({ module });
  }, []);

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
            <div className="rounded-full bg-gray-300 w-[25px] h-[25px]">
              <img src={lock} />
            </div>
          ) : quizStatus == "full" ? (
            <div className="rounded-full bg-white w-[25px] h-[25px]">
              <img src={tick} />
            </div>
          ) : (
            <div
              className={`rounded-full ${
                isQuizSelected &&
                currentModule?.quizzes[0]?._id == currentQuiz[0]?._id &&
                module._id == currentModule._id
                  ? "border-2 border-shardeumOrange"
                  : "border-2 border-white "
              } bg-shardeumBlue  w-[25px] h-[25px]`}
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
