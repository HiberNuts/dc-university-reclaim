import React, { useState } from "react";
import image from "../../assets/courseimage.png";
import CourseAcordian from "../CourseAcoridan/CourseAcordian";

const CoursePage = () => {
  const modules = [
    {
      id: "1",
      title: "MODULE 1",
      chapters: [
        {
          id: "1",
          title: "raghav",
          content: "CONTENT !",
        },
        {
          id: "2",
          title: "raghav2",
          content: "CONTENT 2",
        },
        {
          id: "3",
          title: "raghav3",
          content: "CONTENT 3",
        },
      ],
    },
    {
      id: "2",
      title: "MODULE 2",
      chapters: [
        {
          id: "1",
          title: "raghav",
          content: "CONTENT !",
        },
        {
          id: "2",
          title: "raghav2",
          content: "CONTENT 2",
        },
        {
          id: "3",
          title: "raghav3",
          content: "CONTENT 3",
        },
      ],
    },
  ];

  const USER = {
    id: "dsad",
    name: "dsfds",
    email: "fsdf",
    courseEnrolled: [
      {
        CourseId: {
          moduleId: {
            completed: false,
          },
        },
      },
    ],
  };

  const [currentChapter, setCurrentChapter] = useState([]);
  const [completedChapters, setCompletedChapters] = useState([]);

  const handleChapterSelect = (chapter) => {
    setCurrentChapter(chapter);
  };

  const markAsCompleted = () => {
    if (currentChapter) {
      setCompletedChapters((prevChapters) => [...prevChapters, currentChapter]);
    }
  };

  console.log(modules[0].chapters[0].content);

  return (
    <div className="w-full h-full flex justify-between align-middle">
      <div className="bg-shardeumBlue px-[48px] py-[48px] w-[395px] h-[100vh] left-0 flex flex-col align-middle items-center overflow-y-auto">
        <div className="">
          <div>
            <img className="rounded-xl" src={image} alt="" />
          </div>
          <p className="text-white text-[22px] text-center mt-2">Course Name</p>
          <div className="mt-10">
            {modules.map((module, index) => (
              <CourseAcordian
                className="mt-10"
                moduleIndex={index}
                title={module.title}
                chapters={module.chapters}
                setCurrentChapter={setCurrentChapter}
                currentChapter={currentChapter}
                onChapterSelect={handleChapterSelect}
                completedChapters={completedChapters}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        {modules[currentChapter?.moduleIndex]?.chapters[currentChapter?.chapterIndex].content}
        <button>MARK AS DONE</button>
      </div>
    </div>
  );
};

export default CoursePage;
