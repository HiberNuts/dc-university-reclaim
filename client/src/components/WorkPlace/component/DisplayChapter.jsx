import React, { useEffect } from "react";
import HTMLRenderer from "react-html-renderer";
import { CustomFigure } from "./customCourseElement";
import { updateCourseProgressAPI } from "../../../utils/api/CourseAPI";
import whiteExpand from "../../../assets/whiteArrow.svg";
import toast, { Toaster } from "react-hot-toast";
import LongArrow from "../../../assets/LongArrow.svg";
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
    let chapterIndex = currentModule?.chapter.findIndex((c) => c._id == chapter._id);
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
    if (chapterIndex == 0) {
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
  console.log(currentModule);
  return (
    <div className=" w-full bg-shardeumWhite text-[20px] md:px-[120px] px-[80px] courseContent justify-center align-middle  flex-col ">
      <Toaster />
      {currentModule?.chapter
        .filter((chapter) => chapter._id === currentChapter._id)
        .map((chapter) => (
          <div className="w-full font-helvetica-neue-roman font-extralight items-center">
            <HTMLRenderer
              html={chapter?.content}
              components={{
                figure: (props) => <CustomFigure {...props} />,
                strong: (props) => <p className="font-bold">{props?.children}</p>,
                h1: (props) => <h1>{props?.children}</h1>,
                h2: (props) => <h2>{props?.children}</h2>,
                h3: (props) => <h3>{props?.children}</h3>,
                h4: (props) => <h4>{props?.children}</h4>,
                span: (props) => <>{props?.children}</>,
                li: (props) => <li className="">{props?.children}</li>,
                ol: (props) => <ol className="list-decimal p-[0px] m-[0px]">{props?.children}</ol>,
                ul: (props) => <ul className="list-disc p-[0px] m-[0px]">{props?.children}</ul>,
                
              }}
            />
            <div className="flex w-full mt-10 justify-end">
              <button
                disabled={currentChapterStatus == "full" ? true : false}
                onClick={() => handleCompleteChapter({ chapter })}
                className={`bg-shardeumRed rounded-[10px] h-[48px] flex justify-center  px-[32px] py-[22px]  transition ease-in-out items-center font-semibold align-middle text-center text-white text-[16px] `}
              >
                <span className="items-center text-center ">
                  {currentChapterStatus == "full" ? "Completed" : "Mark as complete"}
                </span>
              </button>
            </div>

            <div className="w-full mt-10 flex justify-between align-middle items-center">
              {currentModule?.chapter.findIndex((c) => c._id == chapter._id) == 0 ? (
                <div></div>
              ) : (
                <button
                  onClick={() => {
                    handlePrevChapterClick({ chapter });
                  }}
                  className={`bg-shardeumRed h-[58px] w-[58px] flex justify-center align-middle  hover:bg-shardeumGreen rounded-[10px]  transition ease-in-out items-center font-semibold  text-center text-white text-[16px] `}
                >
                  <img className="rotate-180" src={LongArrow} />
                </button>
              )}

              {currentChapterStatus == "full" && (
                <button
                  onClick={() => {
                    handleNextChapterClick({ chapter });
                  }}
                  className={`bg-shardeumRed h-[58px] w-[58px] flex justify-center align-middle  hover:bg-shardeumGreen rounded-[10px]  transition ease-in-out items-center font-semibold  text-center text-white text-[16px] `}
                >
                  <img className={``} src={LongArrow} />
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DisplayChapter;
