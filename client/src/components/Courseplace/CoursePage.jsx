import React, { useEffect, useState } from 'react';
import image from '../../assets/courseimage.png';
import CourseAcordian from '../CourseAcoridan/CourseAcordian';
import axios from 'axios';
import CoursePlace from './CoursePlace';

const CoursePage = () => {
  const [moduleContent, setModuleContent] = useState('');

  const getCourseContent=async()=>{
    axios
      .get('http://localhost:1337/api/courses/1?populate=deep')
      .then((response) => {
        const content = response.data?.data?.attributes;
        console.log(content);
        if (content) {
          setModuleContent(content);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    getCourseContent()
  }, []);

  const modules = [
    {
      id: '1',
      title: 'MODULE 1',
      chapters: [
        {
          id: '1',
          title: 'raghav',
          content: 'CONTENT !',
        },
        {
          id: '2',
          title: 'raghav2',
          content: 'CONTENT 2',
        },
        {
          id: '3',
          title: 'raghav3',
          content: 'CONTENT 3',
        },
      ],
    },
    {
      id: '2',
      title: 'MODULE 2',
      chapters: [
        {
          id: '1',
          title: 'raghav',
          content: 'CONTENT !',
        },
        {
          id: '2',
          title: 'raghav2',
          content: 'CONTENT 2',
        },
        {
          id: '3',
          title: 'raghav3',
          content: 'CONTENT 3',
        },
      ],
    },
  ];

  const USER = {
    id: 'dsad',
    name: 'dsfds',
    email: 'fsdf',
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

  console.log(moduleContent?.module?.[0]?.chapter);

  return (
    <div className="w-full h-full flex justify-between align-middle">
      <div className="bg-shardeumBlue px-[48px] py-[48px] w-[20%] h-[100vh] left-0 flex flex-col align-middle items-center overflow-y-auto">
        <div className="">
          <div>
            <img className="rounded-xl" src={image} alt="" />
          </div>
          <p className="text-white text-[22px] text-center mt-2">{moduleContent?.title}</p>
          <div className="mt-10">
            {modules.map((module, index) => (
              <CourseAcordian
                key={index}
                className="mt-10"
                title={moduleContent?.module?.[index]?.moduleTitle}
                chapters={moduleContent?.module?.[index]?.chapter ? moduleContent?.module?.[index]?.chapter :[]}
                setCurrentChapter={setCurrentChapter}
                currentChapter={currentChapter}
                onChapterSelect={handleChapterSelect}
                completedChapters={completedChapters}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-[80%]">
        <CoursePlace />
      </div>
    </div>
  );
};

export default CoursePage;
