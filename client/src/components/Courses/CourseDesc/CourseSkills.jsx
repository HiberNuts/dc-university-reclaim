import React from "react";
import  OrangeButton  from "../../button/OrangeButton";

const CourseSkills = ({ props }) => {

  return (
    <div className="w-full  flex justify-center items-center align-middle">
      <div className="sm:w-[70%] w-[90%] flex flex-col">
        <p className="font-satoshi text-[48px] font-extrabold items-center text-center  ">
          Skills You'll <span className="BlueGradientFade">Gain</span>
        </p>
        <div className="skills-div flex flex-wrap w-full justify-start lg:justify-between mt-6 gap-10 items-start">
          {props?.map((prop,index) => (
            <OrangeButton key={index} style={"h-10 px-10"} title={prop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSkills;
