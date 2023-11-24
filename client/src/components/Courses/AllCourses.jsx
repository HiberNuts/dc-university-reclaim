import React, { useState, useEffect, useContext, useMemo } from "react";
import SkeletonLoader from "./SkeletonLoader";
import { Toaster, toast } from "react-hot-toast";
import CourseCard from "./CourseCard/CourseCard";
import { ParentContext } from "../../contexts/ParentContext";
import { getAllCourse } from "../../utils/api/CourseAPI";

export default function AllCourses() {
  const [allCourseInfo, setallCourseInfo] = useState([]);
  const [loading, setloading] = useState(false);

  const getAllCourseInfo = async () => {
    setloading(true);
    const data = await getAllCourse();
    setallCourseInfo(data);
    setloading(false);
  };

  useEffect(() => {
    getAllCourseInfo();
  }, []);
  const [Query, setQuery] = useState("");

  const BGlogoSVG = ({ props }) => {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 269 274" fill="none">
        <g opacity="0.15">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M111.194 249.226L48.1334 101.459L94.9448 107.544L139.477 211.888L111.194 249.226ZM158.005 255.309L139.471 211.896L207.442 122.164L254.252 128.248L158.005 255.309ZM76.4123 64.1274L94.9478 107.541L207.452 122.152L235.735 84.8125L76.4123 64.1274ZM162.735 127.086C151.457 118.543 135.461 120.666 127.005 131.828C118.55 142.99 120.839 158.963 132.117 167.507C143.396 176.05 159.392 173.927 167.847 162.765C176.302 151.603 174.014 135.63 162.735 127.086Z"
            fill="url(#paint0_linear_383_992)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_383_992"
            x1="124.906"
            y1="137.584"
            x2="186.086"
            y2="163.607"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#3A4CFF" />
            <stop offset="1" stop-color="#3A4CFF" stop-opacity="0.36" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <div className="flex justify-center w-full items-center align-middle">
      <div className="absolute md:rotate-0 rotate-45  lg:opacity-100 opacity-30 z-50 top-16 md:left-0 md:top-16 left-[10%] w-80  ">
        <BGlogoSVG props={""} />
      </div>
      <div className="w-[90%] mt-[72px] ">
        <div className="corse_header gap-[32px] w-full items-center flex flex-col justify-center align-middle">
          <p className="font-satoshi text-[48px]  font-extrabold items-center text-center  ">
            Explore right <span className="BlueGradientFade">Courses for you</span>
          </p>
          <p className="font-[500] text-center text-[18px]">Learn how to build on Shardeum and Join the Community</p>
          <div className="w-[80%] h-[48px] text-center items-center flex justify-center align-middle">
            <input
              className="w-full border-2 border-shardeumPurple align-middle h-full items-center pl-5 focus:border-2 focus:outline-none focus:border-shardeumOrange focus:ring-shardeumOrange active:border-shardeumOrange"
              style={{
                borderRadius: "10px",
                fontSize: "20px",
              }}
              placeholder=" &#128270; Search course by title"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="all-course mt-[72px] mb-[72px] w-full items-center flex justify-center align-middle">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="flex flex-wrap w-full justify-evenly gap-y-[72px]">
              {allCourseInfo &&
                allCourseInfo
                  ?.filter((course) => {
                    if (Query == "") {
                      return course;
                    } else if (course.title.toLowerCase().includes(Query.toLowerCase())) {
                      return course;
                    }
                  })
                  ?.map((course, index) => {
                    return <CourseCard key={index} props={course} />;
                  })}
            </div>
          )}
        </div>
      </div>
      <div className="absolute sm:visible sm:flex overflow-hidden hidden lg:opacity-100 opacity-30 z-50 top-16 right-5 rotate-90 w-80 ">
        <BGlogoSVG props={""} />
      </div>
    </div>
  );
}
