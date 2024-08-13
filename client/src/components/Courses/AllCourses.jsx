import React, { useState, useEffect, useContext, useMemo } from "react";
import SkeletonLoader from "./SkeletonLoader";
import { Toaster, toast } from "react-hot-toast";
import CourseCard from "./CourseCard/CourseCard";
import { ParentContext } from "../../contexts/ParentContext";
import { getAllCourse, getAllCourseWithPagination } from "../../utils/api/CourseAPI";
import Pagination from "../Pagination/Pagination";
export default function AllCourses() {
  const [allCourseInfo, setallCourseInfo] = useState([]);
  const [loading, setloading] = useState(false);
  //FOR PAGINATION
  const [totalItems, setTotalItems] = useState(0);
  const coursesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  // const [minIndex, setMinIndex] = useState(0);
  // const [maxIndex, setMaxIndex] = useState(6);

  const getAllCourseInfo = async () => {
    setloading(true);
    await getAllCourseWithPagination(currentPage, coursesPerPage).then((resp) => {
      setTotalItems(resp.totalItems);
      setallCourseInfo(resp.courses);
      setloading(false);
    })
  };

  useEffect(() => {
    getAllCourseInfo();
  }, [currentPage]);

  const [Query, setQuery] = useState("");

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
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="all-course w-full flex justify-start align-middle">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="w-full">
            <div className="flex flex-wrap w-full justify-evenly gap-x-[10px] gap-y-[64px]">
              {allCourseInfo &&
                allCourseInfo?.reverse()
                  ?.filter((course) => {
                    if (Query == "") {
                      return course;
                    } else if (course.title.toLowerCase().includes(Query.toLowerCase())) {
                      return course;
                    }
                  })
                  ?.map((course, index) => {
                    return course.softDelete != true ? <CourseCard key={index} props={course} /> : "";
                  })}
            </div>
            <div className="flex justify-center items-center  mt-10">
              <Pagination totalItems={totalItems} itemsPerPage={coursesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              <br />
              <br />
              <br />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
