import React from "react";
import check from "../../../assets/check1.png";

export const LearnCard = ({ text }) => {
  return (
    <div className="bg-shardeumPurple flex gap-4 w-full px-[16px] py-[16px] sm:px-[24px] sm:py-[20px] rounded-[16px]">
      <span className="align-middle justify-center lg:h-[28px] lg:w-[50px] md:w-[80px] md:h-[30px] sm:h-[30px] sm:w-[50px]  h-[30px]">
        <img className="w-full h-full" src={check} />
      </span>
      <p className="font-[500]  text-[18px] text-start">{text}</p>
    </div>
  );
};

const CourseLearn = ({ props }) => {
  return (
    <div className="w-full  flex justify-center items-center align-middle">
      <div className="sm:w-[80%] flex flex-col">
        <p className="font-satoshi text-[48px] font-extrabold items-center text-center  ">
          What You'll <span className="BlueGradientFade">Learn</span>
        </p>
        <div className="w-full flex justify-center align-middle items-center">
          <div className="learn-div grid md:grid-cols-2  flex-wrap  justify-between  mt-6 gap-10">
            {props?.map((prop, index) => (
              <LearnCard key={index} text={prop?.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearn;
