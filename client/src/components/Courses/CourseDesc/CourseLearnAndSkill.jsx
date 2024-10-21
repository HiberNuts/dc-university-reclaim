import React from "react";
import illustration from "../../../assets/Illustration.png";
import grainyBG from "../../../assets/image-41.png";
import Line from "../../../assets/Line-course.svg";
import LineBG from "../../../assets/Line-course-bg.png";
const CourseLearnAndSkill = () => {
  return (
    <div className="flex flex-col px-20 pt-20">
      {/* upper side  */}
      <div className="flex  w-full  gap-20 pb-20 relative overflow-hidden ">
        <div className="absolute -top-[300px] overflow-hidden ">
          <img src={Line} alt="line" className="h-[1400px]  " />
        </div>
        {/* lef side */}
        <div className="flex flex-col gap-14 w-1/2 ">
          {/* What You'll Learn Section */}
          <div className="w-[630px] h-[476px] bg-[#121212] rounded-lg px-10  py-9 border border-[#5D89FF]/50 relative">
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
            <h2 className="text-white text-[32px] text-center font-orbitron font-semibold mb-4">
              What you'll Learn
            </h2>
            <ul className="space-y-7">
              {Array(5)
                .fill("")
                .map((_, index) => (
                  <li key={index} className="flex flex-nowrap items-start gap-x-5 ">
                    <span className="size-6 flex-nowrap bg-[#3A59FE]  flex items-center justify-center rounded-[4px]">
                      {/* <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg> */}
                    </span>
                    <p className="text-[#b1b0b9] text-sm">
                      Web3 is a vast and complex ecosystem. Choose from hundreds of mate rials to
                      find the path that's right for you.
                    </p>
                  </li>
                ))}
            </ul>
          </div>

          {/* Skills You'll Gain Section */}
          <div className="w-[630px] h-[476px] bg-[#121212]  py-9 px-10 rounded-lg border border-[#5D89FF]/50 relative ">
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
            <h2 className="text-white text-center text-[32px] font-orbitron font-semibold  mb-4">
              Skills You'll Gain
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array(8)
                .fill("")
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-5 bg-[#1b2232] rounded-md p-3 border border-[#5d89ff80]"
                  >
                    <span className="w-5 h-5 bg-[#3A59FE] rounded-md flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </span>
                    <p className="text-[#b1b0b9]">Cryptography</p>
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
        <div className="w-[630px] h-[476px] bg-[#121212] rounded-lg px-10  py-9 border border-[#5D89FF]/50 relative">
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
          <h2 className="text-white text-[32px] text-center font-orbitron font-semibold mb-4">
            What you'll Learn
          </h2>
          <ul className="space-y-7">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <li key={index} className="flex flex-nowrap items-start gap-x-5 ">
                  <span className="size-6 flex-nowrap bg-[#3A59FE]  flex items-center justify-center rounded-[4px]">
                    {/* <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg> */}
                  </span>
                  <p className="text-[#b1b0b9] text-sm">
                    Web3 is a vast and complex ecosystem. Choose from hundreds of mate rials to find
                    the path that's right for you.
                  </p>
                </li>
              ))}
          </ul>
        </div>

        {/* Skills You'll Gain Section */}
        <div className="w-[630px] h-[476px] bg-[#121212]  py-9 px-10 rounded-lg border border-[#5D89FF]/50 relative ">
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
          <h2 className="text-white text-center text-[32px] font-orbitron font-semibold  mb-4">
            Skills You'll Gain
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array(8)
              .fill("")
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-x-5 bg-[#1b2232] rounded-md p-3 border border-[#5d89ff80]"
                >
                  <span className="w-5 h-5 bg-[#3A59FE] rounded-md flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </span>
                  <p className="text-[#b1b0b9]">Cryptography</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearnAndSkill;
