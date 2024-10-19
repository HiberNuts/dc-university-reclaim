import React from 'react'
import line from '../../assets/line.svg'
import image41 from '../../assets/image-41.png'
import image52 from '../../assets/image-52.png'
import arrowLeft from '../../assets/arrow-left.svg'
import { useState, useEffect } from 'react'
import { getAllCourse } from '../../utils/api/CourseAPI'
import { truncate } from '../../utils/truncate'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { formatTimestamp } from '../../utils/time'
import { FaRegCalendarAlt } from "react-icons/fa";
import DCButton from '../button/DCButton'


export const CourseCard = ({ title, description, image, date = null, btnContent = "Start Learning", onClick }) => {

  return (
    <div className="flex flex-col w-full items-start justify-center gap-6 pt-5 pb-6 px-5 relative bg-[#121212] rounded-[20px] overflow-hidden border border-solid border-[#79797b80]">
      <div className="absolute w-[226px] h-[226px] top-[414px] left-[91px] bg-[#79797b] rounded-[113px] blur-[169.5px] opacity-45" />
      <div className="absolute w-[408px] h-[502px] top-0 left-0 overflow-hidden">
        <div className="relative w-[1280px] h-[502px] opacity-5">
          <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image} />
          <img className="w-80 h-[223px] top-[60%] left-0 absolute object-cover" alt="Image" src={image} />
          <img className="w-80 h-[251px] top-0 left-80 absolute object-cover" alt="Image" src={image} />
          <img className="w-80 h-[223px] top-[300px] left-[360px] absolute object-cover" alt="Image" src={image} />
          <div className="absolute w-80 h-[251px] top-[1317px] left-[-960px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
            <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image} />
            <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image} />
            <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image} />
          </div>
        </div>
      </div>
      <div className="relative self-stretch w-full h-[280px] md:h-[200px] bg-black rounded-xl overflow-hidden border border-solid border-[#79797b80]">
        <img className="absolute w-full h-[[100%] top-0 left-0 object-cover" alt="Image" src={image} />
      </div>
      <div className="gap-4 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <p className="relative self-stretch mt-[-1.00px] font-gilroybold text-white text-xl tracking-[0] leading-[30px]">
          {title}
        </p>
        <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7 h-28 overflow-hidden">
          {truncate(description, 60)}
        </p>
      </div>
      {
        date &&
        <div className="">
          <p className="text-[14px] text-[#b1b0b9]">
            <span className="flex gap-x-1 pr-2">
              <div className="pt-[2px] leading-tight text-[#b1b0b9] text-overflow-ellipsis font-helvetica-neue-bold">
                <FaRegCalendarAlt />
              </div>
              <div className="">
                {formatTimestamp(date)}
              </div>
            </span>
          </p>
        </div>
      }
      <DCButton btnContent={btnContent} onClick={onClick} />
    </div>
  );
};


const CohortsAndLearning = () => {
  const [allCourseInfo, setAllCourseInfo] = useState([]);

  // Function to fetch course information
  const getAllCourseInfo = async () => {
    const data = await getAllCourse();
    setAllCourseInfo(data);
  };

  useEffect(() => {
    getAllCourseInfo();
  }, []);

  return (
    <div className="flex flex-col gap-10 pt-40 pb-[100px] px-2 md:px-20 relative self-stretch w-full flex-[0_0_auto]">
      <img className="absolute w-[1440px] h-[1089px] top-[-5px] left-0 pointer-events-none" alt="Line" src={line} />
      <div className="absolute w-[400px] h-[400px] top-[254px] right-10 bg-[#4064cd] rounded-[200px] blur-[300px] opacity-45" />
      <div className="relative w-fit mt-[-1.00px]
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-orbitron font-bold text-transparent text-[28px] md:text-[40px] tracking-[0] leading-[50px] whitespace-nowrap">
        Interactive Learning and Cohorts
      </div>
      <div className='px-2'>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-5">
          {["DeFi", "Solidity", "NFTs", "DAOs", "Zk Proofs", "Security", "Rust"].map((item, index) => (
            <div key={index} className="flex flex-col w-[150px] items-center justify-center gap-8 p-5 relative rounded-[60px] overflow-hidden border border-solid border-[#5d89ff80] shadow-[0px_0px_10px_#3a59fe] [background:linear-gradient(180deg,rgba(14,60,200,0.5)_0%,rgb(17.85,17.85,17.85)_100%)]">
              <div className="relative w-fit mt-[-1.00px] font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course cards */}
      <div className="gap-7 grid col-span-1 md:grid-cols-3">
        {allCourseInfo && allCourseInfo.reverse().slice(0, 3).map((course, index) => (
          course.softDelete !== true ? (
            <div className='col-span-1'>
              <CourseCard
                key={index}
                title={course.title}
                description={course.description}
                image={course.banner} // Assuming 'banner' is the image property
              />
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default CohortsAndLearning;