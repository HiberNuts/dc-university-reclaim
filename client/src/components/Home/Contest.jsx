import { useRef } from "react"
import { motion, useScroll } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";

import CONTEST_IMG from '../../assets/contest.png';
import GreenButton from "../button/GreenButton";

export default function Contest(){
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["0 3", "1 1"] });
  let contentDescription="Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum Ensure rapid development and build powerful Linearly rapid development and build powerful Linearly";
   return(
    <div className="w-full mt-4 flex flex-col bg-shardeumWhite p-[40px] sm:p-[80px] text-black items-center  justify-center align-middle">
        <div className="flex flex-col w-full space-y-12">
           <p className="font-helvetica-neue-bold text-[64px]  items-center text-center  ">Upcoming Contest</p>
           <div className="flex justify-center items-center">
           <motion.div
            ref={scrollRef}
            style={{
            scale: scrollYProgress,
            opacity: scrollYProgress,
            boxShadow: "0px 4px 20px 0px rgba(195, 200, 255, 0.30)",
            }}
            className="flex card-container  h-[320px] bg-white border-[2px] shadow flex-row justify-center align-middle w-[300px] sm:w-[1200px] rounded-[16px] "
            >
                   <div className="flex-[2]">
                        <LazyLoadImage
                         className="w-full px-10 pt-7 rounded-[16px]"
                         src={CONTEST_IMG}   
                        />
                   </div>                    
                   <div className="flex-[3] p-8">
                        <div className="title-container">
                            <p className="text-[32px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold font-bold">
                                How do you clone a smart contract?
                            </p>
                        </div>
                        <div className="description-container">
                            <p className="text-[16px] mt-2 text-slategray font-helvetica-neue-roman leading-[25px]">
                                {contentDescription.slice(0, 140) + (contentDescription.length > 140 ? "..." : "")}
                            </p>
                        </div>
                        <div className="details-container my-3">
                            <div className="my-1">
                                 <div className="">
                                     <p className="text-[15px]">
                                        <span className="pr-2 border-r-2 border-r-[#C3C8FF]">
                                          <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Difficulty Level:</span><span className="text-[14px]">  Easy</span> 
                                        </span>
                                        <span className="px-2">
                                          <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Participants:</span> <span className="text-[14px]">  100</span> 
                                        </span>
                                    </p>
                                 </div>
                            </div>
                            <div className="my-1">
                                 <div className="">
                                     <p className="text-[15px]">
                                        <span className="pr-2 border-r-2  border-r-[#C3C8FF]">
                                          <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Start:</span><span className="text-[14px]">  May 21, 2024 7:30AM (GMT+5:30)</span>
                                        </span>
                                        <span className="px-2">
                                          <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">End:</span><span className="text-[14px]">  May 21, 2024 7:30AM (GMT+5:30)</span>
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
                        <div className="button-container">
                               <GreenButton
                                 text={"Register Now"}
                               />
                        </div>
                   </div>                    
 
            </motion.div>
           </div>
        </div>
    </div>
   )
}