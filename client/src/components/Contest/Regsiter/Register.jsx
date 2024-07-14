import { LazyLoadImage } from "react-lazy-load-image-component";
import GreenButton from "../../button/GreenButton";
import toast, { Toaster } from "react-hot-toast";
import Leaderboard from "../Leaderboard/Leaderboard";
import { useParams,useNavigate } from "react-router-dom";
import { CodeBlock, dracula } from 'react-code-blocks';
import React,{ useEffect, useState,useContext } from "react";
import { ParentContext } from "../../../contexts/ParentContext";
import { formatTimestamp,checkTimeLeft } from "../../../utils/time";
import { generateSlug } from "../../../utils/generateSlug";
import { getContestByTitle,registerContest,alreadyRegistered,getLeaderboard } from "../../../utils/api/ContestAPI";
import ContestDetailsLoader from "../ContestLoaders/ContestDetailsLoader";


export default function ContestRegsiter() {
  const { title } = useParams("title");
  const { loggedInUserData } = useContext(ParentContext);
  const navigate=useNavigate();
  const [contest, setContest] = useState(null);
  const [contestID,setContestID]=useState(null);
  const [leaderboard,setLeaderboard]=useState([]);
  const [btn,setBtn]=useState("");
  const [timeLeft, setTimeLeft] = useState({ status: false });
  useEffect(() => {
    getContestByTitle(title).then((res) =>{
     if(res.error==false)
     {
       setContest(res.data[0])
       setContestID(res.data[0]._id);

       //function to check if user already registered
       const checkUserAlreadyRegistered=async()=>{
        await alreadyRegistered(loggedInUserData?.accessToken,res.data[0]._id).then((resp)=>{
          if(resp.error==false&&resp.message=="User already registered for the contest!")
            setBtn("Continue");
          else
              setBtn("Register Now")
            
        })
       }
       checkUserAlreadyRegistered();

     } 

    } 
  );
  }, [loggedInUserData]);

  const handleRegister=async()=>{
      if(btn=="View Solution")
       {
        navigate(`/contest/${generateSlug(contest?.title)}/solution`)
        return;
       }
      await registerContest(loggedInUserData?.accessToken,contestID).then((resp)=>{
       try {
         console.log("response for registration-->",resp);
         if(resp.error==false)
          navigate(`/editor/${title}/${resp.data.submissionId}`);
         else
         {
           if(resp.message=="Unauthorized")
             toast.error("Please login to Register for the contest!");
          else
             toast.error(resp.message);
         }
       } catch (error) {
           toast.error("Please login to continue")
       } 
      })
  }
  const getLeaderboardRank=async()=>{
     await getLeaderboard(contest?._id).then((resp)=>{
      if(resp.error==false)
        setLeaderboard(resp.data);
     });
  }
  useEffect(()=>{
    if(contest!=null)
      {
        const updateTimer = () => {
          var status = checkTimeLeft(contest?.startDate, contest?.endDate);
          setTimeLeft(status);
        };
        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);
        //FOR LEADERBOARD
        if(contest?.leaderboard==true)
          getLeaderboardRank();
        //CONDITION TO DISABLE REGISTER BUTTON AFTER CONTEST IS OVER
        if(contest?.endDate)
        {
          const givenDate = new Date(contest?.endDate);
          const now = new Date();

          if (givenDate < now) {
             setBtn("View Solution")
          } 
        }
        return () => clearInterval(intervalId);
      }
  },[contest,btn])
  return contest ? (
    <div className="bg-white pb-10">
    <Toaster/>
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
                 {
                  !timeLeft.status&&
                 <p className='my-2 text-[16px] '>
                     <span className="leading-[28px] text-overflow-ellipsis font-bold">Start:</span><span className="pl-1"> {formatTimestamp(contest.startDate)}</span>
                 </p>
                 }
                 {
                  !timeLeft.status&&
                 <p className='my-2 text-[16px] '>
                     <span className="leading-[28px] text-overflow-ellipsis font-bold">End:</span><span className="pl-1"> {formatTimestamp(contest.endDate)}</span>
                 </p>
                 }
                {timeLeft.status && (
                          <p className='my-2 text-[16px]'>
                              <span className="leading-[28px] text-overflow-ellipsis font-bold">Ends in:</span> <span className="text-red-500 pl-1"> {timeLeft?.timeleft}</span>
                          </p> 
                )}
                 <div>
    </div>
              </div>
              <div className='py-2 mt-10'>
                 {
                  btn!=""&&
                  <GreenButton 
                   text={btn}
                   isHoveredReq={true}
                   onClick={handleRegister}
                   />
                 }
              </div>
          </div>
          <div className='order-1 md:order-2 flex justify-center md:justify-end items-center'>
             <LazyLoadImage
             className="h-[375px] py-2 rounded-[20px]"
             src={contest?.image} 
             />
          </div>
    </div>
    {
   leaderboard.length>0&&
     <div className="px-5 sm:px-10 md:px-[50px] lg:px-[100px] py-[30px]">
       <div className="py-5">
          <p className="my-2 text-[64px]  leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Leaderboard</p>
       </div>
  
        <Leaderboard data={leaderboard}/>
       
     </div>
    }
    <div className="contest-details grid grid-cols-2 lg:grid-cols-3 px-5 sm:px-10 md:px-[50px] lg:px-[100px] py-[30px]">
          <div className='col-span-2 md:pr-8'>
             <div className='contest-details-title'>
                 <p className='my-2 text-[64px]  leading-tight text-overflow-ellipsis font-helvetica-neue-bold'>
                   Contest Details
                 </p>
             </div>
             <div className='contest-details-description'>
                 <p className='text-[18px] mt-2 text-black font-helvetica-neue-roman leading-[31.5px] opacity-[70%]'>{contest?.details}</p>
             </div>
             <div className='contest-details-rules py-5'>
                 <p className='text-[18px] font-semibold'>Rules:</p>
                 <ul className='mx-1'>
                 {contest.rules.map((s, index) => (
                    <li className={`${s.type == 'code' ?'px-1':''} py-1 leading-[30px] list-none`} key={index}>
                      {/* {
                        s.type!='code'&&
                        <span className="w-2 h-2 bg-[#605d5d] rounded-full inline-block mr-2"></span>
                      } */}
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
                 </ul>
             </div>
             <div className='contest-details-rules py-5'>
                 <p className='text-[18px] font-semibold'>Winnings:</p>
                 <ul className='mx-1'>
                 {contest.warnings.map((s, index) => (
                      <li className={`${s.type == 'code' ?'px-1':''} py-1 leading-[30px] list-none`} key={index}>
                      {/* {
                        s.type!='code'&&
                        <span className="w-2 h-2 bg-[#605d5d] rounded-full inline-block mr-2"></span>
                      } */}
                      <span className={` text-[15px] text-slategray font-helvetica-neue-roman leading-[25px]`}>
                        {s.type == 'link' ? (
                          <a href={s.url} className="underline" target="_blank" rel="noopener noreferrer">
                            {s.content}
                          </a>
                        ) : s.type == 'code' ? (
                          s.content.split('\n').map((line, idx) => (
                            <React.Fragment key={idx}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))
                        ) : (
                          s.content
                        )}
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
    // <div className="py-40 text-[25px] flex justify-center items-center">
    //     <p>Loading...</p>
    // </div>
    <ContestDetailsLoader/>
  );
}
