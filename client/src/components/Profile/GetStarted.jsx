import { useEffect, useState } from 'react';
import '../Home/Home.css';
import CourseCard from '../Courses/CourseCard/CourseCard';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { getAllCourse } from '../../utils/api/CourseAPI';

export default function GetStarted() {
  const [allCourseInfo, setallCourseInfo] = useState([]);

  const getAllCourseInfo = async () => {
    const data = await getAllCourse();
    setallCourseInfo(data);
  };

  useEffect(() => {
    getAllCourseInfo();
  }, []);

  return (
    <>
      <div className='flex justify-between border-b-2 border-b-dimgray pb-4'>
        <div>
          <p className="font-helvetica-neue text-[48px] font-[900]">
            Get Started With our Courses
          </p>
        </div>
        <div className='self-center'>
          <p className="text-shardeumBlue   cursor-pointer hover:scale-105  text-[18px] font-bold ">
            <Link to="/courses" class>
              View More{' '}
              <FontAwesomeIcon className="mt-1" icon={faAngleRight} />{' '}
            </Link>
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full ">
        <div className="flex w-full justify-center flex-wrap gap-5">
          {allCourseInfo &&
            allCourseInfo?.map((course, index) => {
              return <CourseCard key={index} props={course} />;
            })}
        </div>
      </div>
    </>
  );
}
