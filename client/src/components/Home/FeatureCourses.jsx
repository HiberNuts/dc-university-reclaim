import React, { useContext, useEffect, useRef, useState } from "react";
import "./Home.css";
import CourseCard from "../Courses/CourseCard/CourseCard";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ParentContext } from "../../contexts/ParentContext";
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
    <div className="w-full flex flex-col bg-shardeumPink p-[80px] text-black items-center  justify-center align-middle">
      <div className="flex flex-col w-full ">
        <p className="font-helvetica-neue text-[64px] font-extrabold items-center text-center  ">Explore Our Courses</p>
        <div className="flex w-full my-5 justify-center flex-wrap gap-5">
          {allCourseInfo &&
            allCourseInfo?.map((course, index) => {
              return course.softDelete != true ? <CourseCard key={index} props={course} /> : "";
            })}
        </div>
      </div>
      <p className="text-shardeumBlue w-[90%] my-[20px]  cursor-pointer hover:scale-105 flex justify-center align-middle gap-2 text-[20px] font-bold items-center  text-center">
        <Link to="/courses">
          View all Courses <FontAwesomeIcon className="mt-1" icon={faAngleRight} />{" "}
        </Link>
      </p>
    </div>
  );
}
