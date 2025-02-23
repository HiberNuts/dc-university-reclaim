import React from "react";
import illustration from "../../../assets/Illustration.png";
import grainyBG from "../../../assets/image-41.png";
import Line from "../../../assets/Line-course.svg";
import LineBG from "../../../assets/Line-course-bg.png";
import { FaCheck } from "react-icons/fa6";

const CourseLearnAndSkill = ({ learn = [], skills = [], about }) => {
  console.log("LEANR: ", learn, " SKILLS:", skills, "ABOUT:", about)
  return (
    <div className="flex flex-col px-4 sm:px-10 md:px-20 pt-20">
      {/* upper side  */}
      <div className="flex  w-full  gap-20 pb-20 relative overflow-hidden ">
        <div className="absolute -top-[300px] overflow-hidden ">
          <img src={Line} alt="line" className="h-[1400px]  " />
        </div>
        {/* lef side */}
        <div className="flex flex-col gap-14 lg:w-1/2 w-full ">
          {/* What You'll Learn Section */}
          <div className="w-full bg-[#121212] rounded-lg px-10  py-9 border border-decentraBlue/50 relative">
            <div className="absolute inset-0 flex mix-blend-overlay opacity-30 ">
              <div>
                <img src={grainyBG} alt="grainy bg" />
                <img src={grainyBG} alt="grainy bg" />
              </div>
              <div>
                <img src={grainyBG} alt="grainy bg" />
                <img src={grainyBG} alt="grainy bg" />
              </div>
            </div>
            <h2 className="text-white text-[32px] text-center font-montserrat-semibold  mb-4">
              What you'll Learn
            </h2>
            <ul className="space-y-7">
              {learn && learn
                .map((single, index) => (
                  <li key={index} className="flex  items-start ">
                    <div className="w-6 h-6 bg-[#3A59FE] rounded-[4px] flex items-center justify-center flex-shrink-0 mr-4">
                      <FaCheck className="text-white" size={12} />
                    </div>
                    <p className="text-[#b1b0b9] text-sm text-wrap ">
                      {single}
                    </p>
                  </li>
                ))}
            </ul>
          </div>

          {/* Skills You'll Gain Section */}
          <div className="w-full bg-[#121212]  py-9 px-10 rounded-lg border border-decentraBlue/50 relative ">
            {/* grainy bg */}
            <div className="absolute inset-0 flex mix-blend-overlay opacity-30 ">
              <div>
                <img src={grainyBG} alt="grainy bg" />
                <img src={grainyBG} alt="grainy bg" />
              </div>
              <div>
                <img src={grainyBG} alt="grainy bg" />
                <img src={grainyBG} alt="grainy bg" />
              </div>
            </div>
            <h2 className="text-white text-center text-[32px] font-montserrat-semibold  mb-4">
              Skills You'll Gain
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills && skills
                .map((single, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-5 bg-[#1b2232] rounded-md p-3 border border-[#5d89ff80]"
                  >
                    <div className="w-5 h-5 bg-[#3A59FE] rounded-md flex items-center justify-center">
                      <FaCheck className="text-white" size={12} />
                    </div>
                    <p className="text-[#b1b0b9]">{single}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="items-start justify-center w-1/2 hidden lg:flex">
          <img src={illustration} alt="illustration" className=" object-cover" />
        </div>
      </div>
      {/* lower side */}
      <div className="flex lg:flex-row flex-col gap-14 lg:gap-0 justify-between w-full py-20 relative overflow-hidden  ">
        <div className="absolute -top-[500px] ">
          <img src={Line} alt="line" className="h-[1400px]  " />
        </div>
        {/* What You'll Learn Section */}
        <div className="lg:w-1/2 w-full bg-[#121212] mr-10 rounded-lg px-10  py-9 border border-decentraBlue/50 relative">
          <div className="absolute inset-0 flex mix-blend-overlay opacity-30 ">
            <div>
              <img src={grainyBG} alt="grainy bg" />
              <img src={grainyBG} alt="grainy bg" />
            </div>
            <div>
              <img src={grainyBG} alt="grainy bg" />
              <img src={grainyBG} alt="grainy bg" />
            </div>
          </div>
          <h2 className="text-white text-[32px] text-center font-montserrat-semibold mb-4">
            What you'll Learn
          </h2>
          <ul className="space-y-7">
            {learn && learn
              .map((single, index) => (
                <li key={index} className="flex  items-start">
                  <div className="w-6 h-6 bg-[#3A59FE] rounded-[4px] flex items-center justify-center flex-shrink-0 mr-4">
                    <FaCheck className="text-white" size={12} />
                  </div>
                  <p className="text-[#b1b0b9] text-sm text-wrap ml-4">
                    {single}
                  </p>
                </li>
              ))}
          </ul>
        </div>

        {/* Skills You'll Gain Section */}
        <div className="lg:w-1/2 w-full bg-[#121212]  py-9 px-10 rounded-lg border border-decentraBlue/50 relative ">
          {/* grainy bg */}
          <div className="absolute inset-0 flex mix-blend-overlay opacity-30 ">
            <div>
              <img src={grainyBG} alt="grainy bg" />
              <img src={grainyBG} alt="grainy bg" />
            </div>
            <div>
              <img src={grainyBG} alt="grainy bg" />
              <img src={grainyBG} alt="grainy bg" />
            </div>
          </div>
          <h2 className="text-white text-center text-[32px] font-montserrat-semibold  mb-4">
            Skills You'll Gain
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills && skills
              .map((single, index) => (
                <div
                  key={index}
                  className="flex items-center gap-x-5 bg-[#1b2232] rounded-md p-3 border border-[#5d89ff80]"
                >
                  <div className="w-5 h-5 bg-[#3A59FE] rounded-md flex items-center justify-center">
                    <FaCheck className="text-white" size={12} />
                  </div>
                  <p className="text-[#b1b0b9]">{single}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearnAndSkill;
