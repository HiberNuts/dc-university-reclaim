import React, { useContext, useRef } from "react";
import "./Home.css";
import CourseCard from "../Courses/CourseCard/CourseCard";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ParentContext } from "../../contexts/ParentContext";

export default function FeatureCourses() {
  const { allCourseMetaInfo } = useContext(ParentContext);

  return (
    <div className="w-full flex flex-col text-black items-center  justify-center align-middle">
      <div className="flex flex-col w-full ">
        <p className="font-satoshi text-[48px] font-extrabold items-center text-center  ">
          Explore Our <span className="BlueGradientFade">Courses</span>
        </p>
        <div className="flex w-full my-5 justify-center gap-x-14 flex-wrap gap-5">
          {allCourseMetaInfo &&
            allCourseMetaInfo?.map((course, index) => {
              return <CourseCard key={index} props={course} />;
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
