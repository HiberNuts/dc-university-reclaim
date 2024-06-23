import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { checkTimeLeft } from "../../../utils/time";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';

import { useState,useEffect } from "react";
export default function Problem(props) {
  const [timeLeft, setTimeLeft] = useState({ status: false });

  useEffect(()=>{
    if(props?.contest!=null)
      {
        const updateTimer = () => {
          var status = checkTimeLeft(props?.contest?.startDate, props?.contest?.endDate);
          setTimeLeft(status);
        };
        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);
        return () => clearInterval(intervalId);
      }
  },[props?.contest])
  return (
    <div className={`px-[40px] py-[64px] relative ${props.className}`}>
      <div className="flex justify-between items-center">

      <p className={`text-3xl font-bold text-[26px] ${props.darkTheme && "text-[#CAFFEF]"}`}>{props?.contest?.title??'-'}</p>
      {props.darkTheme?<IoSunny className="text-white text-lg cursor-pointer absolute top-5 right-5" onClick={props.toggleTheme}/>
		:<IoMoon className=" text-lg cursor-pointer absolute top-5 right-5" onClick={props.toggleTheme}/>
		}
      </div>

      {
        timeLeft.status&&
      <span>
      <div>
        <FontAwesomeIcon icon={faClock} />{' '}<span className="px-2">{timeLeft.timeleft}</span>
        </div>
      </span>
      }
      <br/>
      <span className="rounded-[40px] border-[1px] py-[14px] px-[16px]  mt-4">
            <span className="font-bold text-[16px]">Difficulty level:</span>
            <span className="font-[500] text-[16px] text-[#FF4C0F] ml-1">{props?.contest?.level}</span>
      </span>
      <br/>
       {
        props?.program?.description?.map((s,index)=>
        <p className="text-lg leading-[31.5px] mt-5">
           {s}
        </p>
        )
       }
    </div>
    
  );
}
