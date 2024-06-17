import CONTEST_IMG from "../../../assets/contest.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import GreenButton from "../../button/GreenButton";
import Leaderboard from "../Leaderboard/Leaderboard";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatTimestamp } from "../../../utils/time";
import { getContests,registerContest } from "../../../utils/api/ContestAPI";
export default function ContestRegsiter() {
  const { title } = useParams("title");
  const navigate=useNavigate();
  const [contest, setContest] = useState(null);
  const [contestID,setContestID]=useState(4);
  useEffect(() => {
    getContests(title).then((res) =>{
      setContest(res.data[0].attributes)
      setContestID(res.data[0].id);
    } 
  );
  }, []);

  const handleRegister=async()=>{
       navigate(`/editor/${title}/${contestID}`);
  }
  return contest ? (
    <div className="bg-white pb-10">
    <div className="contest-header grid grid-cols-1 md:grid-cols-2 px-5 sm:px-10 md:px-[50px] lg:px-[100px] py-[50px] bg-[#CAFFEF]">
          <div className='order-2 md:order-1 pr-2'>
              <p className='my-2 text-[64px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold'>{contest.title}</p>
              <p className='my-2 text-[18px] text-black font-helvetica-neue-roman leading-[31.5px] opacity-[70%] '>{contest.description}</p>
              <div className='grid grid-cols-1 space-y-[6px]'>
                 <p className='text-[16px] '>
                     <span className="leading-[28px] text-overflow-ellipsis font-bold">Difficulty Level:</span><span className=" pl-1">  {contest.level}</span> 
                 </p>
                 <p className='my-2 text-[16px] '>
                     <span className="leading-[28px] text-overflow-ellipsis font-bold">Participants:</span> <span className="pl-1">  {contest.participants}</span> 
                 </p>
                 <p className='my-2 text-[16px] '>
                     <span className="leading-[28px] text-overflow-ellipsis font-bold">Start:</span><span className="pl-1"> {formatTimestamp(contest.startDate)}</span>
                 </p>
                 <p className='my-2 text-[16px] '>
                     <span className="leading-[28px] text-overflow-ellipsis font-bold">End:</span><span className="pl-1"> {formatTimestamp(contest.endDate)}</span>
                 </p>
                 {/* When the contest is live  */}
                 {/* <p className='my-2 text-[15px]'>
                     <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Ending in:</span> <span className="text-red-500 pl-1"> 2d : 11h :59m :22s</span>
                 </p>  */}
              </div>
              <div className='py-2 mt-10'>
                  <GreenButton 
                   text={"Start Now"}
                   isHoveredReq={true}
                   onClick={handleRegister}
                   />
              </div>
          </div>
          <div className='order-1 md:order-2 flex justify-center md:justify-end items-center'>
             <LazyLoadImage
             className="h-[375px] py-2 rounded-[20px]"
             src={contest.image.data.attributes.url} 
             />
          </div>
    </div>
    <div className="px-5 sm:px-10 md:px-[50px] lg:px-[100px] py-[30px]">
       <div className="py-5">
          <p className="my-2 text-[64px]  leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Leaderboard</p>
       </div>
       <Leaderboard/>
    </div>
    <div className="contest-details grid grid-cols-2 lg:grid-cols-3 px-5 sm:px-10 md:px-[50px] lg:px-[100px] py-[30px]">
          <div className='col-span-2 md:pr-8'>
             <div className='contest-details-title'>
                 <p className='my-2 text-[64px]  leading-tight text-overflow-ellipsis font-helvetica-neue-bold'>
                   Contest Details
                 </p>
             </div>
             <div className='contest-details-description'>
                 <p className='text-[18px] mt-2 text-black font-helvetica-neue-roman leading-[31.5px] opacity-[70%]'>The Web3 Code Challenge is a 36-hour IRL event with full of fun, awards, knowledge, skills, and challenges for all developers including Web2 and Web3 developers. The Web3 Code Challenge consists of a BIG CHALLENGE and SMALL CHALLENGES. In the BIG CHALLENGE, participants with their teams will have the opportunity to challenge themselves to make ideas and build tools and projects based on specific topics related to both Web2 and Web3. SMALL CHALLENGES is designed for individual developers and will pop up every 3 hours for  all participants to challenge themselves and be ranked in the list to win instant awards for each small challenge, and win medals for the final ranking list at the end of events.</p>
             </div>
             <div className='contest-details-rules py-5'>
                 <p className='text-[18px] font-semibold'>Rules:</p>
                 <ul className='mx-1'>
                    {contest.rules[0].children.map((s, index) => (
                    <li className="py-1" key={index}>
                      <span className="w-2 h-2 bg-[#605d5d] rounded-full inline-block mr-2"></span>
                      <span className="text-[15px]  text-slategray font-helvetica-neue-roman leading-[25px]">
                        {s.children[0].text}
                      </span>
                    </li>
                      ))}
                 </ul>
             </div>
             <div className='contest-details-rules py-5'>
                 <p className='text-[18px] font-semibold'>Winnings:</p>
                 <ul className='mx-1'>
                 {contest.warnings[0].children.map((s) => (
                    <li className="py-1">
                      <span className="w-2 h-2 bg-[#605d5d] rounded-full inline-block mr-2"></span>
                      <span className="text-[15px]  text-slategray font-helvetica-neue-roman leading-[25px]">
                        {s.children[0].text}
                      </span>
                    </li>
                  ))}
                 </ul>
             </div>
          </div>
          <div className='col-span-1'></div>
    </div>
</div>
  ) : (
    <div className="py-40 text-[25px] flex justify-center items-center">
        <p>Loading...</p>
    </div>
  );
}
