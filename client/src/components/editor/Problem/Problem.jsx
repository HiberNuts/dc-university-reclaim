import React from "react"
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { checkTimeLeft } from "../../../utils/time";
import { useState, useEffect } from "react";
import { renderContent } from "../../../utils/mapRichText";
import { LuTimer } from "react-icons/lu";
export default function Problem(props) {
  const [timeLeft, setTimeLeft] = useState({ status: false });

  useEffect(() => {
    if (props?.contest != null) {
      const updateTimer = () => {
        const status = checkTimeLeft(props?.contest?.startDate, props?.contest?.endDate);
        setTimeLeft(status);
      };
      updateTimer();
      const intervalId = setInterval(updateTimer, 1000);
      return () => clearInterval(intervalId);
    }
  }, [props?.contest])
  return (
    <div className={`px-[40px] relative ${props.className}  border-r-[0.1px] border-r-[#5D89FF] min-h-screen`}>
      <div className="size-[400px] rounded-full bg-[#3A59FE] overflow-hidden absolute pointer-events-none top-20 -right-80 z-0 blur-[100px] opacity-40"></div>
      <div className="flex justify-between items-center">
        <p className="relative self-stretch mt-[-1.00px] font-gilroy font-semibold text-white text-[24px] tracking-[0] leading-[30px]">

          {props?.contest?.title ?? '-'}</p>
        {props.darkTheme ? <IoSunny className="text-white text-lg cursor-pointer absolute top-5 right-5" onClick={props.toggleTheme} />
          : <IoMoon className=" text-lg cursor-pointer absolute top-5 right-5" onClick={props.toggleTheme} />
        }
      </div>
      {
        timeLeft.status &&
        <span className="">
          <div className="flex gap-1 py-4">
            <div className="flex justify-center items-center text-[20px]"><LuTimer /></div>
            <span className="px-2 relative self-stretch mt-[-1.00px] font-gilroy  text-white text-[18px] tracking-[0] leading-[30px]">{timeLeft.timeleft}</span>
          </div>
        </span>
      }
      <div className="flex flex-col w-fit items-center justify-center gap-8 p-5 relative rounded-[60px] overflow-hidden border border-solid border-[#5d89ff80] shadow-[0px_0px_10px_#3a59fe] [background:linear-gradient(180deg,rgba(14,60,200,0.5)_0%,rgb(17.85,17.85,17.85)_100%)]">
        <div className="relative w-fit mt-[-1.00px] font-gilroy text-white text-md tracking-[0] leading-[18px] whitespace-nowrap">
          Difficulty Level : {props?.contest?.level}
        </div>
      </div>

      <br />
      <br />
      {props?.program?.description.map((item, index) => (
        <React.Fragment key={index}>{renderContent(item)}</React.Fragment>
      ))}
    </div>

  );
}
