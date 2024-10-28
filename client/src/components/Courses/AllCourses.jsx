import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import CourseCard from "./CourseCard/CourseCard";
import { getAllCourseWithPagination } from "../../utils/api/CourseAPI";
import Pagination from "../Pagination/Pagination";
import vector from "../../assets/vector.svg"
import coursesBG from "../../assets/COURSES.svg"
import { CourseCard } from "../Home/CohortsAndLearning";
import PastContestCardLoader from "../Contest/ContestLoaders/PastContestCardLoader";

export default function AllCourses() {
  const navigate = useNavigate();

  const categories = ["DeFi", "Solidity", "NFTs", "DAOs", "Zk Proofs", "Security", "Rust"];

  const [allCourseInfo, setallCourseInfo] = useState([]);
  const [loading, setloading] = useState(false);
  //FOR PAGINATION
  const [totalItems, setTotalItems] = useState(0);
  const coursesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [Query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(categories);

  

  const getAllCourseInfo = async () => {
    setloading(true);
    await getAllCourseWithPagination(currentPage, coursesPerPage).then((resp) => {
      setTotalItems(resp.totalItems);
      // Ensure all courses have a category property
      const coursesWithCategory = resp.courses.map(course => ({
        ...course,
        category: course.category || "Uncategorized"
      }));
      setallCourseInfo(coursesWithCategory);
      setloading(false);
    })
  };

  useEffect(() => {
    getAllCourseInfo();
  }, [currentPage]);

  const handleClickCourse = (props) => {
    navigate(`/course/${props?.title.split(" ").join("-")}`)
  }

  const handleCategoryClick = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        // Always remove the clicked category
        return prev.filter(cat => cat !== category);
      } else {
        // If all categories were previously selected, only select the clicked one
        return prev.length === categories.length ? [category] : [...prev, category];
      }
    });
  }

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
    <div className=" bg-black md:py-[64px] md:px-[100px] py-[34px] px-[10px] justify-center w-full items-center align-middle">
      <div className="sm:absolute sm:block hidden z-0 left-0">
        <LogoSvg />
      </div>
      <div className="corse_header z-10 gap-[32px] md:mb-[72px] mb-[42px] w-full items-center flex flex-col justify-center align-middle">
        <div className="relative w-fit mt-[-1.00px]
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-montserrat-bold text-transparent text-[22px] md:text-[32px] tracking-[0] leading-[50px] whitespace-nowrap">
          Courses Curated for you
        </div>
        <div className="absolute top-[23%]">
          <img src={coursesBG} alt="courses bg"/>
        </div>
        <div className="overflow-hidden">
          <div className="hidden md:block size-[400px] rounded-full bg-[#3A59FE] overflow-hidden absolute pointer-events-none top-0 left-[40%] z-0 blur-[200px] opacity-60"></div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-5">
          {categories.map((item, index) => (
            <div 
              key={index} 
              onClick={() => handleCategoryClick(item)}
              className={`flex flex-col w-[150px] items-center justify-center gap-8 p-5 relative rounded-[60px] overflow-hidden border border-solid border-[#5d89ff80] cursor-pointer ${
                selectedCategories.includes(item) ? 'shadow-[0px_0px_10px_#3a59fe] [background:linear-gradient(180deg,rgba(14,60,200,0.5)_0%,rgb(17.85,17.85,17.85)_100%)] ' : ' [background:linear-gradient(180deg,rgb(7,7,7)_0%,rgb(18,18,18)_100%)]'
              } `}
            >
              <div className="relative w-fit mt-[-1.00px] font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-5 ">
        <img className="relative w-full rotate-180 h-[42px]" alt="Vector" src={vector} />
      </div>
      <div className="all-course w-full flex justify-start align-middle">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            {
              Array.from({ length: 3 }).map((_, index) => (
                <PastContestCardLoader key={index} className="my-10 col-span-1 w-full" />
              ))
            }
          </div>
        ) : (
          <div className="w-full">
            <div className="grid col-span-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourseInfo &&
                allCourseInfo
                  .filter((course) => {
                    const matchesQuery = Query === "" || course.title.toLowerCase().includes(Query.toLowerCase());
                    const matchesCategory = selectedCategories.length === categories.length || 
                      (course.category && selectedCategories.includes(course.category));
                    return matchesQuery && matchesCategory && course.softDelete !== true;
                  })
                  .map((course, index) => {
                    return <div key={index} className="col-span-1">
                      <CourseCard 
                        title={course?.title} 
                        description={course?.description} 
                        image={course?.banner} 
                        onClick={() => handleClickCourse(course)} 
                      />
                    </div>
                  })}
            </div>
            <div className="flex justify-center items-center mt-10">
              <Pagination 
                totalItems={totalItems} 
                itemsPerPage={coursesPerPage} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
