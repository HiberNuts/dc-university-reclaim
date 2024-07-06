import React from "react"
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { checkTimeLeft } from "../../../utils/time";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { CodeBlock, dracula } from 'react-code-blocks';
import { CiTimer } from "react-icons/ci";
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
      <div className="flex gap-1">
        <div className="flex justify-center items-center text-[20px]"><CiTimer/></div>
        <span className="px-2">{timeLeft.timeleft}</span>
        </div>
      </span>
      }
      <br/>
      <span className="rounded-[40px] border-[1px] py-[14px] px-[16px]  mt-4">
            <span className="font-bold text-[16px]">Difficulty level:</span>
            <span className="font-[500] text-[16px] text-[#FF4C0F] ml-1">{props?.contest?.level}</span>
      </span>   
      <br/>
      <br/>
                  {props?.program?.description?.map((s, index) => (
                    <li className={`${s.type == 'code' ?'bg-[#474747] px-5':''} list-none`} key={index}>
                      {
                        s.type!='code'&&
                        <span className="w-2 h-2 bg-[#4b4b4b] rounded-full inline-block mr-2"></span>
                      }
                      <span className={` text-[15px] text-slategray font-helvetica-neue-roman leading-[25px]`}>
                        {s.type == 'link' ? (
                          <a href={s.url} className="underline text-shardeumBlue" target="_blank" rel="noopener noreferrer">
                            {s.content}
                          </a>
                        ) : s.type == 'code' ? (
                            <CodeBlock
                            language="javascript"
                            text={s.content}
                            theme={dracula}
                            className="custom-copy-block"
                          />
                        ) : (
                          s.content
                        )}
                      </span>
                    </li>
                  ))}
    </div>
    
  );
}
