import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Acordian.scss";
import whiteExpand from "../../assets/whiteArrow.svg";
import { LockIcon, TickIcon } from "./Icons";
import { useEffect } from "react";

const AccordionContext = React.createContext({});
const useAccordion = () => React.useContext(AccordionContext);

function Accordion({ children, multiple, defaultIndex }) {
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
          className={` sm:w-[25px] h-[25px]  mt-3  sm:mt-0 transition-transform duration-300 ${isActive ? "rotate-0" : "rotate-180"
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
  setSidebarOpen,
  checkModuleCoursesStatus,
  currentModule,
  currentQuiz,
  setcurrentQuiz,
  isProgramSelected,
  setIsProgramSelected,
}) => {
  const handleCompleteChapter = async ({ chapter }) => {
    const updatedProgress = await userCourseProgress.modules.map((progressModule) => {
      const updatedChapters = progressModule.chapters.map((progressChapter) => {
        if (progressChapter._id === chapter._id) {
          return { ...progressChapter, status: "partial" };
        }
        return progressChapter;
      });

      const updatedModule = {
        ...progressModule,
        chapters: updatedChapters,
      };

      return updatedModule;
    });

    setuserCourseProgress({ ...userCourseProgress, modules: updatedProgress });
  };

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
                        setIsProgramSelected(false);
                        handleChapterClick(chapter);
                        checkModuleCoursesStatus({ module });
                        setcurrentModule(module);
                        setisModuleChanged(!isModuleChanged);
                        setSidebarOpen(false);
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
                            className={`rounded-full ${isQuizSelected
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
                            className={`rounded-full ${isQuizSelected
                              ? "text-white border-2 border-white"
                              : chapter._id == currentChapter._id
                                ? "border-2 bg-white border-black"
                                : "border-2 bg-white border-black"
                              }   w-[30px] h-[30px]`}
                          ></div>
                        )}
                        <label
                          htmlFor="red-checkbox"
                          className={`ml-2 font-helvetica-neue-md text-[16px] items-start text-start ${isQuizSelected || isProgramSelected
                            ? "text-white"
                            : chapter._id == currentChapter._id
                              ? "border-b-2 border-shardeumGreen"
                              : `${userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status !== "full" ||
                                userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status !== "none"
                                ? "text-white"
                                : "text-white "
                              }`
                            } cursor-pointer`}
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
                setSidebarOpen={setSidebarOpen}
                setIsProgramSelected={setIsProgramSelected}
              />
              {module.program && (
                <RenderProgram
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
                  isProgramSelected={isProgramSelected}
                  setSidebarOpen={setSidebarOpen}
                  setIsProgramSelected={setIsProgramSelected}
                />
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    );
  } else {
    console.log("USER COURSE PROGRESS NOT FOUND");
  }
};

const RenderProgram = ({
  module,
  isModuleChanged,
  setcurrentModule,
  setisModuleChanged,
  userCourseProgress,
  currentModule,
  setisQuizSelected,
  isProgramSelected,
  setIsProgramSelected,
  setSidebarOpen
}) => {
  const [programStatus, setprogramStatus] = useState("");

  const [currentQuizStatus, setcurrentQuizStatus] = useState("none");

  const checkModuleQuizStatus = async ({ module }) => {
    await userCourseProgress?.modules?.map((progressModule) => {
      if (progressModule?._id === module?._id) {
        setcurrentQuizStatus(progressModule?.quizStatus);
        setprogramStatus(progressModule?.programStatus);
      }
    });
  };
  useEffect(() => {
    checkModuleQuizStatus({ module });
  }, [userCourseProgress]);

  return (
    <div>
      <button
        disabled={currentQuizStatus === "full" ? false : true}
        onClick={() => {
          setisQuizSelected(false);
          setIsProgramSelected(true);
          setcurrentModule(module);
          setisModuleChanged(!isModuleChanged);
          setSidebarOpen(false);
        }}
      >
        <div className="flex items-center pt-2  mr-4">
          {currentQuizStatus === "none" ? (
            <div className="rounded-full items-center w-[30px] h-[30px]">
              <LockIcon />
            </div>
          ) : programStatus === "full" ? (
            <div className="rounded-full  w-[30px] h-[30px]">
              <TickIcon />
            </div>
          ) : (
            <div
              className={`rounded-full ${isProgramSelected && module._id === currentModule._id
                ? "border-2 border-black bg-white"
                : "border-2 border-black bg-white "
                } bg-shardeumBlue  w-[30px] h-[30px]`}
            ></div>
          )}

          <label
            htmlFor="red-checkbox"
            className={`ml-2 text-[16px] items-start text-start ${isProgramSelected && module._id === currentModule._id ? "text-shardeumOrange font-bold" : "text-white"
              }    cursor-pointer`}
          >
            Program
          </label>
        </div>
      </button>
    </div>
  );
};

const RenderQuiz = ({
  module,
  setisQuizSelected,
  isModuleChanged,
  isQuizSelected,
  setcurrentModule,
  setisModuleChanged,
  userCourseProgress,
  currentModule,
  currentQuiz,
  setcurrentQuiz,
  setIsProgramSelected,
  setSidebarOpen
}) => {
  const [quizStatus, setquizStatus] = useState("");
  const [currentChaptersStatus, setcurrentChaptersStatus] = useState("none");
  const checkModuleCoursesStatus = async ({ module }) => {
    await userCourseProgress?.modules?.map((progressModule) => {
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
          setIsProgramSelected(false);
          setisQuizSelected(true);
          setcurrentModule(module);
          setcurrentQuiz(module?.quizzes);
          setisModuleChanged(!isModuleChanged);
          setSidebarOpen(false);
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
              className={`rounded-full ${isQuizSelected &&
                currentModule?.quizzes[0]?._id == currentQuiz[0]?._id &&
                module._id == currentModule._id
                ? "border-2 border-black bg-white"
                : "border-2 border-black bg-white "
                } bg-shardeumBlue  w-[30px] h-[30px]`}
            ></div>
          )}

          <label
            htmlFor="red-checkbox"
            className={`ml-2 text-[16px] items-start text-start ${isQuizSelected && currentModule?.quizzes[0]?._id == currentQuiz[0]?._id && module._id == currentModule._id
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
