import React from "react";
import Acordian from "../../Accordian/Acordian";

const CourseFAQ = ({ props }) => {
  console.log(props);
  return (
    <div className="w-full mb-[60px] flex justify-center items-center align-middle">
      <div className="w-[80%] flex flex-col">
        <p className="font-satoshi text-[48px] font-extrabold items-center text-center  ">
          Frequently Asked <span className="BlueGradientFade">Questions</span>
        </p>
        <div className="w-full flex justify-center align-middle items-center">
          <div className="learn-div items-center grid md:grid-cols-2  flex-wrap  justify-center  w-full mt-6 gap-10">
            {props?.map((prop, index) => (
              <div className="w-full">
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
