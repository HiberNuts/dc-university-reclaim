import React, { useState, useEffect} from "react";
import SkeletonLoader from "./SkeletonLoader";

import axios from "axios";
import PreviewCourseCard from "./CourseCard/PreviewCourseCard";

export default function PreviewAllCourses() {
  const [allCourseInfo, setallCourseInfo] = useState([]);
  const [loading, setloading] = useState(false);

  const getAllCourseInfo = async () => {
    const { data } = await axios.get(`https://cms.university.shardeum.org/api/courses?publicationState=preview&filters[publishedAt][$null]=true&populate=deep`)

    setallCourseInfo(data.data);
    setloading(false);
  };

  useEffect(() => {
    getAllCourseInfo();
  }, []);


  const LogoSvg = () => {
    return (
      <svg width="430" height="456" viewBox="0 0 430 456" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.3">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M29.1628 351.963L-29.4131 454.501H369.353L310.777 351.963H29.1628Z"
            stroke="black"
            stroke-width="2"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M111.416 3L-88 351.962H29.1804L169.992 105.542L111.416 3Z"
            stroke="black"
            stroke-width="2"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M228.591 3L170.016 105.542L310.823 351.962H428.007L228.591 3Z"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M169.974 206.161C205.005 206.161 233.401 234.853 233.401 270.249C233.401 305.645 205.005 334.337 169.974 334.337C134.943 334.337 106.547 305.645 106.547 270.249C106.547 234.853 134.943 206.161 169.974 206.161"
            stroke="black"
            stroke-width="2"
          />
        </g>
      </svg>
    );
  };

  return (
    <div className=" bg-shardeumWhite md:py-[64px] md:px-[100px] py-[34px] px-[60px] justify-center w-full items-center align-middle">
      <div className="sm:absolute sm:block hidden z-0 left-0">
        <LogoSvg />
      </div>
      <div className="corse_header z-10 gap-[32px] md:mb-[72px] mb-[42px] w-full items-center flex flex-col justify-center align-middle">
        <p className="font-helvetica-neue-bold sm:text-[64px] text-[42px] items-center text-center  ">
          Explore Our Courses
        </p>
        <p className=" font-helvetica-neue-roman text-center text-[18px]">
          Learn how to build on Shardeum and Join the Community
        </p>
        <div className="md:w-[80%] h-[48px] text-center items-center flex justify-center align-middle">
          <input
            className="w-full z-30 border-2 border-shardeumBlue align-middle h-[56px] items-center pl-5 focus:border-2 focus:outline-none focus:border-shardeumGreen focus:ring-shardeumGreen active:border-shardeumGreen"
            style={{
              borderRadius: "10px",
              fontSize: "20px",
              boxShadow: "6px 6px 0px 0px rgba(0, 0, 0, 0.15)",
            }}
            placeholder=" &#128270; Search course"

          />
        </div>
      </div>
      <div className="all-course w-full flex justify-start align-middle">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex flex-wrap w-full justify-evenly gap-x-[10px] gap-y-[64px]">
            {allCourseInfo &&
              allCourseInfo
                ?.map((course, index) => (

                  <PreviewCourseCard key={index} props={course.attributes} id={course.id} />
                ))
            }
          </div>
        )}
      </div>
    </div>
  );
}
