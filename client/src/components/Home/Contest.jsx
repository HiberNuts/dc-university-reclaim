import { useEffect,useState } from "react"
import { getLatestContest } from "../../utils/api/ContestAPI"
import ContestCard from "../Contest/Card"
export default function Contest(){
   const [latestContest,setLatestContest]=useState(null)
   useEffect(()=>{
      getLatestContest().then(data=>setLatestContest(data.data[0]))
   },[])
  return(
    <div className="w-full mt-4 flex flex-col bg-shardeumWhite p-[12px] sm:p-[80px] text-black items-center  justify-center align-middle">
        <div className="flex flex-col w-full space-y-12">
           <p className="font-helvetica-neue-bold text-[64px]  items-center text-center  ">Upcoming Contest</p>
           <div className="flex justify-center items-center">
                {latestContest?<ContestCard id={latestContest.id} {...latestContest.attributes}/>:<p className="px-5 text-center text-[30px] font-bold">...</p>}
           </div>
        </div>
    </div>
   )
}