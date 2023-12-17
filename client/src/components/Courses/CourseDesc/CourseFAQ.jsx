import React from "react";
import Acordian from "../../Accordian/Acordian";

const CourseFAQ = ({ props }) => {
  return (
    <div className="w-full md:px[100px] md:py-[100px] px-[60px] py-[60px] flex justify-center items-center align-middle">
      <div className="w-[80%] flex flex-col">
        <p className="font-helvetica-neue-bold sm:text-[64px] text-[45px]  items-center text-center  ">
          Frequently Asked Questions
        </p>
        <div className="w-full flex justify-center align-middle items-center">
          <div className="learn-div items-center grid md:grid-cols-2  flex-wrap  justify-center  w-full mt-6 gap-10">
            {props?.map((prop, index) => (
              <div key={index} className="w-full">
                <Acordian key={index} title={prop.faqTitle} desc={prop.faqAnswer} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFAQ;
