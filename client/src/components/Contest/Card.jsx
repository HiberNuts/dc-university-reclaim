import React,{ useRef,useState,useEffect } from "react"
import { motion, useScroll } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import GreenButton from "../button/GreenButton";

import { formatTimestamp,checkTimeLeft } from "../../utils/time";
import { generateSlug } from "../../utils/generateSlug";

export default function ContestCard(props)
{
    // console.log(props)
    const navigate=useNavigate();
    const scrollRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState({ status: false });

    const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["0 3", "1 1"] });
    
    const handleClick=async()=>{
           navigate(`/contest/register/${generateSlug(props.title)}`);
    }
    useEffect(()=>{
        if(props?.startDate)
        {
          const updateTimer = () => {
            var status = checkTimeLeft(props?.startDate, props?.endDate);
            setTimeLeft(status);
          };
          updateTimer();
          const intervalId = setInterval(updateTimer, 1000);
          return () => clearInterval(intervalId);
        }
    },[props])
return(
    <motion.div
    ref={scrollRef}
    style={{
    scale: scrollYProgress,
    opacity: scrollYProgress,
    boxShadow: "0px 4px 20px 0px rgba(195, 200, 255, 0.30)",
    }}
    className="relative flex gap-[20px] card-container lg:h-[364px] bg-white border-[2px] shadow flex-col lg:flex-row justify-center align-middle w-full sm:w-[1240px] rounded-[16px] z-5 overflow-hidden"
    >
           <div className="flex-[2] overflow-hidden">
                <LazyLoadImage
                 className="w-full h-full"
                //  src={props.image.data.attributes.url}   
                 src={props.image}   
                />
           </div>                    
           <div className="flex-[3] flex flex-col justify-between px-[20px]  py-[32px]">
              <div className="">  
                  <div className="title-container">
                      <p className="text-[32px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold font-bold">
                          {props.title}
                      </p>
                  </div>
                  <div className="description-container">
                      <p className="text-[16px] mt-2 text-black font-helvetica-neue-roman leading-[25px] opacity-[70%]">
                          {props?.description?.slice(0, 140) + (props?.description?.length > 140 ? "..." : "")}
                      </p>
                  </div>
                  <div className="details-container my-5">
                      <div className="my-3">
                          <div className="">
                              <p className="text-[15px]">
                                  <span className="pr-2 border-r-2 border-r-[#C3C8FF]">
                                    <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Difficulty Level:</span><span className="text-[14px]">  {props.level}</span> 
                                  </span>
                                  <span className="px-2">
                                    <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Participants:</span> <span className="text-[14px]">  {props.participants}</span> 
                                  </span>
                              </p>
                          </div>
                      </div>
                      {
                        !timeLeft.status&&
                        <div className="hidden md:block my-3">
                            <div className="">
                                <p className="text-[15px]">
                                    <span className="pr-2 border-r-2  border-r-[#C3C8FF]">
                                      <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Start:</span><span className="text-[14px]"> {formatTimestamp(props.startDate)}</span>
                                    </span>
                                    <span className="px-2">
                                      <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">End:</span><span className="text-[14px]">  {formatTimestamp(props.endDate)}</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                      }
                      {
                        !timeLeft.status&&
                        <div className="block md:hidden my-3">
                            <div className="">
                                <p className="text-[15px] flex flex-col">
                                    <span className="pr-2">
                                      <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Start:</span><span className="text-[14px]"> {formatTimestamp(props.startDate)}</span>
                                    </span>
                                    <span className="mt-2">
                                      <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">End:</span><span className="text-[14px]">   {formatTimestamp(props.endDate)}</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                      }
                      {/* When the contest is live  */}
                      {timeLeft.status &&
                        <div className="my-1">
                           <div className="">
                              <p className="text-[15px] flex flex-col">
                                  <span className="pr-2">
                                    <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Ends in:</span><span className="text-[14px] text-red-500"> {timeLeft?.timeleft}</span>
                                  </span>
                                
                              </p>
                          </div>
                        </div>
                      }
                  </div>
              </div>
                <div className="button-container">
                       <GreenButton
                         text={"Register Now"}
                         height="56px"
                         isHoveredReq={true}
                         onClick={handleClick}
                       />
                </div>
           </div> 
           {
            props?.prize&&
            <div className="hidden lg:block absolute bottom-[1px] right-[1px] ">
             <div className="relative z-10">
              {/* <LazyLoadImage
                className="z-[-1]"
                src={PRICE_BADGE}
                /> */}
                {/* <img className="absolute top-0 z-[1]" src={STAR_BG}/> */}
             </div>

            </div>               
           } 
           {
             props?.prize&&
            <div className="hidden lg:block absolute z-10 bottom-7 right-7 border-2 p-3 rounded-lg">
                  <div className="text-[16px] text-right leading-[18px]  text-overflow-ellipsis font-helvetica-neue-bold">Prize Money</div>
                  <div className="text-[42px] text-right leading-[42px]  text-overflow-ellipsis font-helvetica-neue-bold text-shardeumRed">$ {props?.prize}</div>
            </div>
           }   
    </motion.div>
    )  
}