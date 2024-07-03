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
        <p className='my-2 text-[20px] lg:text-[24px] text-left leading-tight text-black text-overflow-ellipsis font-helvetica-neue-bold  pb-3'>Get Started with our Courses</p>
        </div>
        <div className='self-center'>
          <p className="text-shardeumBlue   cursor-pointer hover:scale-105  text-[16px] font-bold ">
            <Link to="/courses" class>
              View More{' '}
              <FontAwesomeIcon className="mt-1" icon={faAngleRight} />{' '}
            </Link>
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full mt-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {allCourseInfo &&
            allCourseInfo?.slice(0,4).map((course, index) => {
              if (course.softDelete != true) {

                return <CourseCard key={index} props={course} />;
              }
            })}
        </div>
      </div>
    </>
  );
}
