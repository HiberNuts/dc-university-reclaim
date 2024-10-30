import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Acordian.scss";
import whiteExpand from "../../assets/whiteArrow.svg";
import { LockIcon, TickIcon } from "./Icons";
import { useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoIosLock } from "react-icons/io";

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
      className={`py-2 px-1 md:px-5  bg-gradient-to-b from-[#3A59FE] to-decentraBlue ${isActive ? "active" : ""} w-full`}
      onClick={() => onChangeIndex(index)}
    >
      <div className="flex w-full justify-between align-middle h-full">
        <div className="flex-1">
          <span className="relative self-stretch  text-[14px] tracking-[0] leading-7 font-gilroybold text-white">
            {text}
          </span>
        </div>
        <div className="flex justify-center items-center">
          <img
            className={`cursor-pointer sm:w-[25px] h-[18px]  mt-3  sm:mt-0 transition-transform duration-300 ${isActive ? "rotate-180" : "rotate-0"
              }`}
            src={whiteExpand}
            alt="Expand"
          />
        </div>
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
          <div className="AccordionPanel rounded-b-lg z-10 border-[1px] border-[#3A59FE] bg-[#121212]  text-white font-helvetica-neue-roman text-[16px]">
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
            <AccordionHeader text={"Module " + (moduleIndex + 1)} />
            <AccordionPanel>
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
                  <div className="my-2">
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
                          // <div className="rounded-full items-center w-[30px] h-[30px]">
                          <div className="h-6 w-6 bg-[#3A59FE] rounded-[4px] flex justify-center items-center">
                            {/* <TickIcon /> */}
                            <IoMdCheckmark />

                            {/* </div> */}
                          </div>
                        ) : userCourseProgress?.modules[moduleIndex]?.chapters[i]?.status === "partial" ? (
                          <div
                            className={`h-6 w-6 rounded-[4px] ${isQuizSelected
                              ? "text-white border-2 border-white"
                              : chapter._id == currentChapter._id
                                ? "border-2 bg-white border-black"
                                : "border-2 bg-white border-black"
                              } bg-[#3A59FE]  w-[30px] h-[30px]`}
                          ></div>
                        ) : userCourseProgress?.modules[moduleIndex]?.chapters[i - 1]?.status !== "full" ? (
                          <div className="h-6 w-6 bg-[#3A59FE] rounded-[4px] flex justify-center items-center">
                            <IoIosLock />
                          </div>
                        ) : (
                          <div
                            className={` h-6 w-6 rounded-[4px] ${isQuizSelected
                              ? "text-white border-2 border-white"
                              : chapter._id == currentChapter._id
                                ? "border-2 bg-white border-black"
                                : "border-2 bg-white border-black"
                              }   `}
                          ></div>
                        )}
                        <label
                          htmlFor="red-checkbox"
                          className={`ml-2 relative self-stretch  text-[16px] tracking-[0] leading-7 font-gilroy text-white items-start text-start ${isQuizSelected || isProgramSelected
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
            <div className="h-6 w-6 bg-[#3A59FE] rounded-[4px] flex justify-center items-center">
              <IoIosLock />
            </div>
          ) : programStatus === "full" ? (
            <div className="h-6 w-6 bg-[#3A59FE] rounded-[4px] flex justify-center items-center">
              <IoMdCheckmark />
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
            <div className="h-6 w-6 bg-[#3A59FE] rounded-[4px] flex justify-center items-center">
              <IoIosLock />
            </div>
          ) : quizStatus == "full" ? (
            <div className="h-6 w-6 bg-[#3A59FE] rounded-[4px] flex justify-center items-center">
              <IoMdCheckmark />
            </div>
          ) : (
            <div
              className={`rounded-full ${isQuizSelected &&
                currentModule?.quizzes[0]?._id == currentQuiz[0]?._id &&
                module._id == currentModule._id
                ? "border-2 border-black bg-white"
                : "border-2 border-black bg-white "
                } bg-[#3A59FE]  w-[30px] h-[30px]`}
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
