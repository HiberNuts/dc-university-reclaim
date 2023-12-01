import React from "react";
import  RedButton  from "../../button/RedButton";

const CourseSkills = ({ props }) => {

  return (
    <div className="w-full justify-center md:px-[100px] md:py-[80px]  px-[60px] py-[60px]  flex  items-center align-middle">
      <div className="flex flex-col">
        <p className="font-helvetica-neue text-[64px] font-extrabold items-center text-center  ">
          Skills You'll Gain
        </p>
        <div className="skills-div flex flex-wrap w-full md:justify-start justify-center mt-6 gap-10 items-start">
          {props?.map((prop,index) => (
            <RedButton key={index} style={"py-2 px-10"} title={prop} />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default CourseSkills;
