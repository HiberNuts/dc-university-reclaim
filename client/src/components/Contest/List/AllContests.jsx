import { motion, useScroll } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRef,useContext,useEffect, useState } from "react";
import Carousel from "../../Carousel/Carousel"
import ContestCard from '../Card';
import GreenButton from "../../button/GreenButton";
import CONTEST_IMG from '../../../assets/contest.png';

import CALENDER from '../../../assets/calendar_month.png';
import { upcomingContests,getPastContests } from "../../../utils/api/ContestAPI";
import { formatTimestamp } from "../../../utils/time";
import Pagination from "../../Pagination/Pagination";
import SkeletonLoader from "../../Courses/SkeletonLoader";
export default function AllContests()
{
    const [latestContests,setLatestContests]=useState([
        <SkeletonLoader className=""/>,
        <SkeletonLoader className=""/>,
        <SkeletonLoader className="" />
    ]);
    const [pastContests,setPastContest]=useState([]);

    //for pagination
    const [totalItems,setTotalPages]=useState(0);
    const contestsPerPage =3;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        upcomingContests().then((resp)=>{
            if(resp.error==false)
                setLatestContests(resp.data.map((contest,index)=>{
                return <ContestCard key={index} id={contest._id} {...contest}/>
                }))
           } 
    )
    
    },[])
    //USE EFFECT FOR PAGINATION
    useEffect(()=>{
        setPastContest([])
        getPastContests(currentPage,contestsPerPage).then((resp)=>{
            if(resp.error==false) 
                {
                    setTotalPages(resp.data.totalItems)
                    setPastContest(resp.data.pastContests.map((contest,index)=>contest))
                }
        })
    },[currentPage])
    const slides = [
        <ContestCard key={0} />,
        <ContestCard key={1} />,
        <ContestCard key={2} />
        // Add more slide components as needed
    ];
      const scrollRef = useRef(null);
      const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["0 3", "1 0"] });
     
    return(
        <div>
            <div className="corousel-container bg-shardeumBlue min-h-[500px] py-10 sm:py-0 flex justify-center items-center">
                <div className="h-[100%] w-full">
                    <Carousel slides={latestContests}/>
                </div>
            </div>
            <div className="past-contents-container bg-[#CAFFEF] min-h-[300px] pt-5 md:pt-20 px-1 md:px-28">
                <div className="flex items-center my-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-[64px] leading-tight font-helvetica-neue-bold text-shardeumBlack">Past Contests</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1"> 
                    {
                        pastContests.length>0?pastContests.map((single)=>
                       <motion.div
                        ref={scrollRef}
                        style={{
                        scale: scrollYProgress,
                        opacity: scrollYProgress,
                        boxShadow: "0px 4px 20px 0px rgba(195, 200, 255, 0.30)",
                        }}
                        className="flex flex-col card-container space-y-3 border-2  bg-white p-5 my-10 mx-5 shadow rounded-[20px] "
                        >
                               <div className="">
                                     <LazyLoadImage
                                        className="w-full h-[300px]  rounded-[16px]"
                                        src={single.image}   
                                        />
                                </div>
                                <div>
                                    <p className="text-[32px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold font-bold">
                                        {single.title}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[16px] mt-2 text-black font-helvetica-neue-roman leading-[25px] opacity-[70%]">
                                      {single?.description?.slice(0, 170) + (single?.description?.length > 170 ? "..." : "")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[14px] ">
                                        <span className="flex gap-x-1 pr-2">
                                          <div className="pt-[2px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold">
                                             <LazyLoadImage
                                                src={CALENDER}
                                                />
                                          </div>
                                          <div className="">
                                             {formatTimestamp(single.endDate)}
                                          </div> 
                                        </span>
                                    </p>
                                </div>
                                <div className="pt-3">
                                     <GreenButton text={"View Solution"} isHoveredReq={true}/>
                                </div>
                      </motion.div> 
                ):
                    Array.from({length:3}).map((_,index)=><SkeletonLoader className="my-10"/>)
                    }
                </div>
                <div className="bg-[#CAFFEF] flex justify-center items-center">
                    <Pagination totalItems={totalItems} itemsPerPage={contestsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    <br/>    
                    <br/>    
                    <br/>    
                </div>
               
            </div>
        </div>
    )
}