import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Home/Home.css';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { getAllCourse } from '../../utils/api/CourseAPI';
import { CourseCard } from '../Home/CohortsAndLearning';
export default function GetStarted() {
  const [allCourseInfo, setallCourseInfo] = useState([]);
  const navigate = useNavigate();

  const getAllCourseInfo = async () => {
    const data = await getAllCourse();
    setallCourseInfo(data);
  };

  useEffect(() => {
    getAllCourseInfo();
  }, []);
  const handleClickCourse = (props) => {
    navigate(`/course/${props?.title.split(" ").join("-")}`)
  }

  return (
    <>
      <div className='flex justify-between border-b-2 border-b-dimgray '>
        <p className="relative text-left  mt-[-1.00px]
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text text-wrap font-montserrat-semibold text-transparent text-[24px] tracking-[0] leading-[50px] whitespace-nowrap">
          Get Started with our courses
        </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5 my-10">
          {allCourseInfo &&
            allCourseInfo?.slice(0, 4).map((course, index) => {
              if (course.softDelete != true) {

                return <CourseCard title={course?.title} description={course?.description} image={course?.banner} onClick={() => handleClickCourse(course)} />;
              }
            })}
        </div>
      </div>
    </>
  );
}
