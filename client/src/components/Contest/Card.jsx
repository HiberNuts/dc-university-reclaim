import React,{ useRef } from "react"
import { motion, useScroll } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CONTEST_IMG from '../../assets/contest.png';
import GreenButton from "../button/GreenButton";

import { formatTimestamp } from "../../utils/time";

export default function ContestCard(props)
{
    console.log(props)
    const navigate=useNavigate();
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["0 3", "1 1"] });
    let contentDescription="Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum Ensure rapid development and build powerful Linearly rapid development and build powerful Linearly";
    const handleClick=()=>{
      navigate(`/contest/register/${props.id}`);
    }
return(
    <motion.div
    ref={scrollRef}
    style={{
    scale: scrollYProgress,
    opacity: scrollYProgress,
    boxShadow: "0px 4px 20px 0px rgba(195, 200, 255, 0.30)",
    }}
    className="flex gap-[40px] card-container lg:h-[364px] bg-white border-[2px] shadow flex-col lg:flex-row justify-center align-middle w-full sm:w-[1240px] rounded-[16px] p-[32px]"
    >
           <div className="flex-[2]">
                <LazyLoadImage
                 className="w-full h-full rounded-[16px]"
                 src={props.image.data.attributes.url}   
                />
           </div>                    
           <div className="flex-[3] flex flex-col justify-between">
              <div className="">  
                  <div className="title-container">
                      <p className="text-[32px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold font-bold">
                          {props.title}
                      </p>
                  </div>
                  <div className="description-container">
                      <p className="text-[16px] mt-2 text-black font-helvetica-neue-roman leading-[25px] opacity-[70%]">
                          {props.description.slice(0, 140) + (props.description.length > 140 ? "..." : "")}
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
                      {/* When the contest is live  */}
                      {/* <div className="my-1">
                          <div className="">
                              <p className="text-[15px]">
                                <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Ending in:</span>
                              </p>
                          </div>
                          <div>
                                <p className="text-[14px]">
                                  <span className="text-red-500">2d : 11h :59m :22s</span>
                                </p>
                          </div>
                      </div> */}
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

    </motion.div>
    )  
}