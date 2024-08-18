import { useEffect, useState } from "react"
import { getLatestContest } from "../../utils/api/ContestAPI"
import ContestCard from "../Contest/Card";
import SkeletonLoader from "../Courses/SkeletonLoader";
import shortRightArrow from "../../assets/shortRightArrow.svg";
import { Link } from "react-router-dom";

export default function Contest() {
   const [latestContest, setLatestContest] = useState(null)
   useEffect(() => {
      getLatestContest().then(data => {
         if (data?.error == false)
            setLatestContest(data.data)
      })
   }, [])
   return (
      <div className="w-full mt-4 flex flex-col bg-shardeumWhite p-[12px] sm:p-[80px] text-black items-center  justify-center align-middle">
         <div className="flex flex-col w-full space-y-12">
            <p className="font-helvetica-neue-bold text-[64px]  items-center text-center  ">Upcoming Contest</p>
            <div className="flex justify-center items-center">
               {latestContest ? <ContestCard id={latestContest._id} {...latestContest} /> : <SkeletonLoader></SkeletonLoader>}
            </div>
            <p className="text-shardeumBlue flex-row font-helvetica-neue-md w-[100%] my-[20px]  cursor-pointer hover:scale-105 flex justify-center align-middle gap-2 text-[26px] items-center  text-center">
               <Link className="flex items-center justify-center h-full align-middle" to="/contests">
                  <span>View all</span>
                  <img src={shortRightArrow} alt="shortRightArrow" className="h-8 w-8 flex-col flex justify-center align-middle" />
               </Link>
            </p>
         </div>
      </div>
   )
}