import React, { useEffect, useRef, useState } from "react";
import image from "../../assets/courseimage.png";
import CourseAcordian from "../CourseAcoridan/CourseAcordian";
import axios from "axios";
import hljs from "highlight.js";
import HTMLRenderer from "react-html-renderer";
import { useParams } from "react-router-dom";
import { getCoursebyName } from "../../utils/api/CourseAPI";
import { H1 } from "./customCourseElement";
import ReactPlayer from "react-player";
import "./WorkPlace.scss";
import Quiz from "../Quiz/Quiz";
export default function WorkPlace() {
  const params = useParams();
  const [moduleContent, setModuleContent] = useState([]);
  const [courseContent, setcourseContent] = useState({});
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentModule, setcurrentModule] = useState(null);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [isModuleChanged, setisModuleChanged] = useState(false);

  const getCourseInfo = async () => {
    const data = await getCoursebyName(params?.id);
    if (data) {
      console.log(data);
      setcourseContent(data ? data : {});
      setModuleContent(data?.module ? data?.module : []);
      setCurrentChapter(data?.module[0]?.chapter[0]?._id);
      setcurrentModule(data?.module[0]);
    }
  };

  const handleChapterClick = (chapter) => {
    setCurrentChapter(chapter._id === currentChapter ? null : chapter._id);
  };

  useEffect(() => {
    hljs.highlightAll();
    getCourseInfo();
  }, []);

  return (
    <div className="w-full mt-[10vh] h-full flex justify-between align-middle">
      <div className="bg-shardeumBlue px-[15px] py-[48px] w-[25%] fixed h-[90vh] left-0 flex flex-col align-middle items-center scroll-m-0 overflow-y-auto">
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
          {/* <p className="text-white text-[12px] text-center mt-2">{moduleContent?.title}</p> */}
          <div className="mt-10">
            {moduleContent?.map((module, index) => (
              <CourseAcordian
                setisModuleChanged={setisModuleChanged}
                isModuleChanged={isModuleChanged}
                key={index}
                module={module}
                className="mt-10"
                setCurrentChapter={setCurrentChapter}
                currentChapter={currentChapter}
                setcurrentModule={setcurrentModule}
                currentModule={currentModule}
                handleChapterClick={handleChapterClick}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="ml-[25%] w-[80%]">
        <div className="flex w-full bg-shardeumPurple my-10 justify-center items-center align-middle">
          {/* <div className="flex justify-center align-middle w-[80%] flex-col" dangerouslySetInnerHTML={{ __html: moduleContent }} /> */}
          <Quiz isModuleChanged={isModuleChanged} moduleQuiz={currentModule?.quizzes ? currentModule?.quizzes : []} />
          {/* {currentChapter && (
            <div className="flex text-[20px] w-[70%] courseContent justify-center align-middle  flex-col ">
              <div className="w-full my-6 items-center flex justify-center">
                <ReactPlayer controls={true} url="https://www.youtube.com/live/U9mJuUkhUzk?si=0UJPlY3vlAvDB3d1" />
              </div>

              {currentModule.chapter
                .filter((chapter) => chapter._id === currentChapter)
                .map((chapter) => (
                  <HTMLRenderer
                    html={chapter?.content}
                    components={{
                      figure: (props) => <H1 {...props} />,
                    }}
                  />
                ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
