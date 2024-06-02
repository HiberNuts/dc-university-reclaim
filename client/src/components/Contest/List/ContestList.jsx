import { motion, useScroll } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRef } from "react";
import Carousel from "../../Carousel/Carousel"
import ContestCard from '../Card';
import GreenButton from "../../button/GreenButton";
import CONTEST_IMG from '../../../assets/contest.png';
import CALENDER from '../../../assets/calendar_month.png';
const PAST_CONTESTS=[
    {
        img:CONTEST_IMG,
        title:"Contest Name",
        description:"Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum Ensure",
        endDate:"May 21, 2024 7:30AM (GMT+5:30)"
    },
    {
        img:CONTEST_IMG,
        title:"Contest Name",
        description:"Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum Ensure",
        endDate:"May 21, 2024 7:30AM (GMT+5:30)"
    },
    {
        img:CONTEST_IMG,
        title:"Contest Name",
        description:"Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum Ensure",
        endDate:"May 21, 2024 7:30AM (GMT+5:30)"
    },
    {
        img:CONTEST_IMG,
        title:"Contest Name",
        description:"Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum Ensure",
        endDate:"May 21, 2024 7:30AM (GMT+5:30)"
    },
    {
        img:CONTEST_IMG,
        title:"Contest Name",
        description:"Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum Ensure",
        endDate:"May 21, 2024 7:30AM (GMT+5:30)"
    },
    {
        img:CONTEST_IMG,
        title:"Contest Name",
        description:"Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum Ensure",
        endDate:"May 21, 2024 7:30AM (GMT+5:30)"
    }
]
export default function ContestList()
{
    const slides = [
        <ContestCard key={0} />,
        <ContestCard key={1} />,
        <ContestCard key={2} />
        // Add more slide components as needed
    ];
      const scrollRef = useRef(null);
      const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["0 3", "1 1"] });
     
    return(
        <div>
            <div className="corousel-container bg-shardeumBlue min-h-[500px] py-10 sm:py-0 flex justify-center items-center">
                <div className="h-[100%] w-full">
                    <Carousel slides={slides}/>
                </div>
            </div>
            <div className="past-contents-container bg-[#CAFFEF] min-h-[300px] pt-5 md:pt-20 px-5 md:px-40">
                <div className="flex items-center my-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-[40px] leading-tight font-helvetica-neue-bold text-shardeumBlack">Past Contests</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> 
                    {
                        PAST_CONTESTS.map((single)=>
                       <motion.div
                        ref={scrollRef}
                        style={{
                        scale: scrollYProgress,
                        opacity: scrollYProgress,
                        boxShadow: "0px 4px 20px 0px rgba(195, 200, 255, 0.30)",
                        }}
                        className="flex flex-col card-container space-y-3 border-2 rounded-lg bg-white py-3 px-5 my-10 mx-5 shadow rounded-[20px] "
                        >
                               <div className="">
                                     <LazyLoadImage
                                        className="w-full  rounded-[16px]"
                                        src={single.img}   
                                        />
                                </div>
                                <div>
                                    <p className="text-[32px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold font-bold">
                                        {single.title}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[16px] mt-2 text-slategray font-helvetica-neue-roman leading-[25px]">
                                      {single.description}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[15px]">
                                        <span className="pr-2">
                                          <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">
                                            {/* <LazyLoadImage
                                                className="w-full  rounded-[16px]"
                                                src={CALENDER}   height={"5px"} width={5}
                                                /> */}
                                          </span>
                                          <span className="text-[14px]">
                                             May 21, 2024 7:30AM (GMT+5:30)
                                          </span> 
                                        </span>
                                    </p>
                                </div>
                                <div>
                                     <GreenButton text={"View Solution"}/>
                                </div>
                      </motion.div> 
                )
                    }
                </div>
            </div>
        </div>
    )
}