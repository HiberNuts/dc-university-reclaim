import React, { useEffect, useState } from "react";
import "./Home.css";
import CourseCard from "../Courses/CourseCard/CourseCard";
import shortRightArrow from "../../assets/shortRightArrow.svg";

import { Link } from "react-router-dom";

import { getAllCourse } from "../../utils/api/CourseAPI";

export default function FeatureCourses() {
  const [allCourseInfo, setallCourseInfo] = useState([]);

  const getAllCourseInfo = async () => {
    const data = await getAllCourse();
    setallCourseInfo(data);
  };

  useEffect(() => {
    getAllCourseInfo();
  }, []);

  return (
    <div className="w-full flex flex-col bg-shardeumPink p-[40px] sm:p-[80px] text-black items-center  justify-center align-middle">
      <div className="flex flex-col w-full ">
        <p className="font-helvetica-neue-bold text-[64px]  items-center text-center  ">Explore Our Courses</p>
        <div className="flex w-full my-10 justify-center flex-wrap gap-5">
          {allCourseInfo &&
            allCourseInfo?.slice(0, 3)?.map((course, index) => {
              return course.softDelete != true ? <CourseCard key={index} props={course} /> : "";
            })}
        </div>
      </div>
      <p className="text-shardeumBlue flex-row font-helvetica-neue-md w-[90%] my-[20px]  cursor-pointer hover:scale-105 flex justify-center align-middle gap-2 text-[26px] items-center  text-center">
        <Link className="flex items-center justify-center h-full align-middle" to="/courses">
          <span>View all Courses</span>
          <img src={shortRightArrow} className="h-8 w-8 flex-col flex justify-center align-middle" />
        </Link>
      </p>
    </div>
  );
}
