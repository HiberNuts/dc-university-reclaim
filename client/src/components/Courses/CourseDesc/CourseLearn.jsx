import React from "react";
import check from "../../../assets/check1.png";

const TickSvg = () => {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="tick">
        <rect x="1" y="1" width="32" height="32" rx="16" fill="#A4FF00" />
        <rect x="1" y="1" width="32" height="32" rx="16" stroke="black" strokeWidth="2" />
        <path
          id="Vector"
          d="M23 13.3L14.75 21.7L11 17.8818"
          stroke="black"
          strokeWidth="2.4"
          strokeLinecap="square"
        />
      </g>
    </svg>
  );
};

export const LearnCard = ({ text }) => {
  return (
    <div className="bg-white  justify-start border-2 border-black align-middle h-auto flex gap-4 w-full px-[16px] py-[16px] sm:px-[24px] sm:py-[20px] rounded-[16px]">
      <span className="align-middle  flex-col justify-center flex">
        <TickSvg />
      </span>
      <p className="font-[500] text-[18px] text-start font-helvetica-neue">{text}</p>
    </div>
  );
};



const CourseLearn = ({ props }) => {
  console.log(props);
  return (
    <div className="w-full md:px-[100px] md:pb-[80px] pb-[80px]  flex justify-center items-center align-middle">
      <div className=" flex flex-col ">
        <p className="font-helvetica-neue text-[64px] font-extrabold items-center text-center  ">
          What You'll Learn
        </p>
        <div className="w-full flex justify-center align-middle items-center">
          <div className="learn-div grid md:grid-cols-2  justify-between  mt-6 gap-10">
         
            {props?.map((prop, index) => (
              
              <LearnCard key={index} text={prop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearn;
