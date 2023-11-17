import React, { useEffect } from "react";
import HTMLRenderer from "react-html-renderer";
import hljs from "highlight.js";
import { CustomFigure } from "./customCourseElement";
import { updateCourseProgressAPI } from "../../../utils/api/CourseAPI";
import whiteExpand from "../../../assets/whiteArrow.svg";
import toast, { Toaster } from "react-hot-toast";

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
      console.log("no button");
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
    });

    if (!updatedUserProgress) {
      toast.error("Something went wrong!");
    } else {
      setuserCourseProgress(updatedUserProgress.updatedProgress);
      console.log(updatedUserProgress);
    }

    checkChapterStatus({ chapter });
    await checkModuleCoursesStatus({ currentModule });
  };

  useEffect(() => {
    hljs.highlightAll();
  }, [currentChapter]);

  return (
    <div className="flex text-[20px] w-[70%] courseContent justify-center align-middle  flex-col ">
      <Toaster />
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
                  <span className="items-center text-center ">Next</span>
                  <img className={`w-6 h-6 -rotate-90 ml-2 items-center  fill-white `} src={whiteExpand} />
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DisplayChapter;
