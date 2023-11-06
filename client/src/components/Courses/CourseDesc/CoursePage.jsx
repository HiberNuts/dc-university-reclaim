import React, { useState } from 'react';
import image from '../../../assets/courseimage.png';
import CourseAcordian from '../../CourseAcoridan/CourseAcordian';

const CoursePage = () => {
  const [currentChapter, setCurrentChapter] = useState(null);
  const [completedChapters, setCompletedChapters] = useState([]);

  const handleChapterSelect = (chapter) => {
    setCurrentChapter(chapter);
  };

  const markAsCompleted = () => {
    if (currentChapter) {
      setCompletedChapters((prevChapters) => [...prevChapters, currentChapter]);

    }
  };

  console.log(completedChapters);


  return (
    <div className="w-full h-full flex justify-between align-middle">
      <div className="bg-shardeumBlue px-[48px] py-[48px] w-[395px] h-[100vh] left-0 flex flex-col align-middle items-center overflow-y-auto">
        <div className="">
          <div>
            <img className="rounded-xl" src={image} alt="" />
          </div>
          <p className="text-white text-[22px] text-center mt-2">Course Name</p>
          <div className="mt-10">
            <CourseAcordian
              className="mt-10"
              title={'Module1'}
              chapters={['hi', 'hello', 'idiot']}
              currentChapter={currentChapter}
              onChapterSelect={handleChapterSelect}
              completedChapters={completedChapters}
            />
            
          </div>
        </div>
      </div>
      <div>
      
      <button onClick={markAsCompleted} className="bg-blue-500 text-white p-2 mt-4">
              Mark as Completed
            </button>
      </div>
    </div>
  );
};

export default CoursePage;
