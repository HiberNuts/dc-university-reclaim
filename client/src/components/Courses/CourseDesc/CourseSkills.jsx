import React from "react";
import RedButton from "../../button/RedButton";

const CourseSkills = ({ props }) => {
  return (
    <div className="w-full justify-center md:px-[100px] md:py-[80px]  px-[40px] py-[40px]  flex  items-center align-middle">
      <div className="flex flex-col">
        <p className="font-helvetica-neue-bold sm:text-[64px] text-[45px] font-extrabold items-center text-center  ">
          Skills You'll Gain
        </p>
        <div className="skills-div flex flex-wrap w-full md:justify-start justify-start mt-6 sm:gap-10 gap-5 items-start">
          {props?.map((prop, index) => (
            <RedButton key={index} style={"md:py-2 md:px-10 py-1 px-5 course-default"} title={prop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSkills;
