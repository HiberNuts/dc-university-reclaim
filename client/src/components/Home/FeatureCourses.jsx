import React from "react";
import "./Home.css";
import FeaturedCourseCard from "../Courses/featuredCourseCard/FeaturedCourseCard";
export default function FeatureCourses() {
  return (
    <div className="w-full mt-[50px]  text-black flex justify-center align-middle">
      <div className="flex flex-col p-[100px] h-[90%]  w-full bg-white rounded-[100px]">
        <button className="w-[200px] hover:scale-110 transition-all">
          <span className="border text-black border-black rounded-[40px] py-[5px] px-[38px]">LET'S START</span>
        </button>
        <p className="font-SpaceGrotesk text-[48px] font-bold ">Explore All Courses</p>
        <div className="flex w-full justify-between flex-wrap gap-5">
          <FeaturedCourseCard />
          <FeaturedCourseCard />
          <FeaturedCourseCard />
          <FeaturedCourseCard />
          <FeaturedCourseCard />
          <FeaturedCourseCard />
        </div>
      </div>
    </div>
  );
}
