import React from "react";
import HTMLRenderer from "react-html-renderer";
import { CustomFigure } from "./customCourseElement";
import { updateCourseProgressAPI } from "../../../utils/api/CourseAPI";
import toast, { Toaster } from "react-hot-toast";
import { CopyBlock, dracula } from "react-code-blocks";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
const DisplayChapter = ({
  currentModule,
  currentChapter,
  setCurrentChapter,
  setisQuizSelected,
  currentChapterStatus,
  setuserCourseProgress,
  userCourseProgress,
  loggedInUserData,
  checkChapterStatus,
  checkModuleCoursesStatus,
  courseId,
  setcurrentQuiz,
  accessToken,

}) => {
  const handleNextChapterClick = async ({ chapter }) => {
    const chapterIndex = currentModule?.chapter.findIndex((c) => c._id === chapter._id);
    if (chapterIndex === currentModule?.chapter.length - 1) {
      setisQuizSelected(true);
      setcurrentQuiz(currentModule?.quizzes);
      window.scrollTo(0, 0);
    } else {
      setCurrentChapter(currentModule?.chapter[chapterIndex + 1]);
      window.scrollTo(0, 0);
    }
  };
  const handlePrevChapterClick = async ({ chapter }) => {
    const chapterIndex = currentModule?.chapter.findIndex((c) => c._id === chapter._id);
    if (chapterIndex === 0) {
      window.scrollTo(0, 0);
    } else {
      setCurrentChapter(currentModule?.chapter[chapterIndex - 1]);
      window.scrollTo(0, 0);
    }
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

    const updatesUserPorgress = {
      ...userCourseProgress,
      modules: updatedProgress,
    };
    const updatedUserProgress = await updateCourseProgressAPI({
      updatesUserPorgress,
      courseId: courseId,
      userId: loggedInUserData?._id,
      accessToken: accessToken,
    });

    if (!updatedUserProgress) {
      toast.error("Something went wrong!");
    } else {
      setuserCourseProgress(updatedUserProgress.updatedProgress);
    }

    checkChapterStatus({ chapter });
    await checkModuleCoursesStatus({ currentModule });
  };
  console.log("CONTENT: ", currentModule?.chapter[0].content)

  return (
    <div className=" w-full  text-[20px]  courseContent justify-center align-middle  flex-col ">
      <Toaster />
      {currentModule?.chapter
        .filter((chapter) => chapter._id === currentChapter._id)
        .map((chapter) => (
          <div className="w-full ">
            <div className="bg-[#121212] p-2 md:p-6 border-[1px] border-[#79797B] rounded-lg">
              <HTMLRenderer
                html={chapter?.content}
                components={{
                  figure: (props) => <CustomFigure {...props} />,
                  strong: (props) => <span className="font-gilroybold">{props?.children}</span>,
                  h1: (props) => <h1 className="relative self-stretch   tracking-[0] leading-7 font-gilroybold">{props?.children}</h1>,
                  h2: (props) => <h2 className="relative self-stretch   tracking-[0] leading-7 font-gilroybold">{props?.children}</h2>,
                  h3: (props) => <h3 className="relative self-stretch   tracking-[0] leading-7 font-gilroybold">{props?.children}</h3>,
                  h4: (props) => <h4 className="relative self-stretch   tracking-[0] leading-7 font-gilroybold" >{props?.children}</h4>,
                  span: (props) => <>{props?.children}</>,
                  li: (props) => <li className="relative self-stretch   tracking-[0] leading-7 font-gilroybold">{props?.children}</li>,
                  ol: (props) => <ol className="list-decimal p-[0px] m-[0px]">{props?.children}</ol>,
                  ul: (props) => <ul className="list-disc p-[0px] m-[0px] ">{props?.children}</ul>,
                  pre: (props) => <span className="font-mono overflow-scroll">{props.children}</span>,
                  code: (props) => <CopyBlock
                    showLineNumbers
                    text={props.children}
                    language="javascript"
                    wrapLongLines
                    theme={dracula}
                    codeBlock
                  />,
                  p: (props) => <p className="my-2 relative self-stretch font-gilroy text-[#b1b0b9] text-[16px] tracking-[0] leading-[31.5px] text-wrap">
                    {props.children}
                  </p>,

                }}
              />
              <div className="flex w-full mt-10 justify-end">
                <button
                  disabled={currentChapterStatus === "full" ? true : false}
                  onClick={() => handleCompleteChapter({ chapter })}
                  className={`bg-gradient-to-b from-[#3A59FE] to-decentraBlue rounded-[10px] h-[48px] flex justify-center  px-[32px] py-[22px]   items-center align-middlerelative self-stretch tracking-[0] leading-7 font-gilroybold  text-white text-sm`}
                >
                  <span className="items-center text-center ">
                    {currentChapterStatus === "full" ? "Completed" : "Mark as complete"}
                  </span>
                </button>
              </div>

            </div>

            <div className=" bg-[#121212] p-2 md:p-6 border-[1px] border-[#79797B] rounded-lg w-full mt-10 flex justify-between align-middle items-center">
              {currentModule?.chapter.findIndex((c) => c._id === chapter._id) === 0 ? (
                <div></div>
              ) : (
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => {
                      handlePrevChapterClick({ chapter });
                    }}
                    className={`bg-gradient-to-b from-[#3A59FE] to-decentraBlue h-[58px] w-[58px] flex justify-center align-middle  hover:bg-black rounded-[10px]  transition ease-in-out items-center font-semibold  text-center text-white text-[16px] `}
                  >
                    <IoMdArrowBack className="text-xl" />
                  </button>
                  <div className="flex flex-col">
                    <p className="relative self-stretch font-gilroy text-[#3A59FE] text-[16px] tracking-[0] leading-[31.5px] text-wraps">Prev Topic</p>
                  </div>
                </div>
              )}

              {currentChapterStatus === "full" && (
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col">
                    <p className="relative self-stretch font-gilroy text-[#3A59FE] text-[16px] tracking-[0] leading-[31.5px] text-wraps">Next Topic</p>
                  </div>
                  <button
                    onClick={() => {
                      handleNextChapterClick({ chapter });
                    }}
                    className={`bg-gradient-to-b from-[#3A59FE] to-decentraBlue h-[58px] w-[58px] flex justify-center align-middle  hover:bg-black rounded-[10px]  transition ease-in-out items-center font-semibold  text-center text-white text-[16px] `}
                  >
                    <IoMdArrowForward className="text-xl" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DisplayChapter;
