import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState,useEffect,useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getPreviewContest,checkAuthinStrapi } from "../../../utils/api/ContestAPI";
import { checkTimeLeft } from "../../../utils/time";
import { formatTimestamp } from "../../../utils/time";
import GreenButton from "../../button/GreenButton";
import { mapRichTextNodesToSchema,renderContent } from "../../../utils/mapRichText";
import { ParentContext } from "../../../contexts/ParentContext";
const PreviewContest=()=>{
    const {id}=useParams();
    const navigate=useNavigate();
    const [contest,setContest]=useState(null);
    const [rules,setRules]=useState(null);
    const [warnings,setWarnings]=useState(null);
    const [loader,setLoader]=useState(true);
    const [timeLeft, setTimeLeft] = useState({ status: false });
    const { loggedInUserData } = useContext(ParentContext);


    useEffect(()=>{
       if(id!=null)
       {
        getPreviewContest(id).then((response)=>{
            console.log("REPSOSN EFOR A PREVIEW COPNTEST: ",response);
            if(response?.data&&response?.data?.attributes);
            {
               setContest(response?.data);
               setLoader(false);
               const mappedRules=response?.data?.attributes?.rules[0].children.map(content=>renderContent(content))
            //    console.log("mapped rules",response?.data?.attributes?.rules[0].children.map(content=>renderContent(content)));
               setRules(mappedRules);
               const mappedWarnings=response?.data?.attributes?.warnings[0].children.map(content=>renderContent(content))
               setWarnings(mappedWarnings);

               const updateTimer = () => {
                var status = checkTimeLeft(response?.data?.attributes?.startDate, response?.data?.attributes?.endDate);
                setTimeLeft(status);
              };
              updateTimer();
              const intervalId = setInterval(updateTimer, 1000);
              return () => clearInterval(intervalId);
            }
        })
       }
    },[])
    
    useEffect(()=>{
         if(loggedInUserData?.walletAddress)
        checkAuthinStrapi(loggedInUserData?.walletAddress).then((response)=>{
            console.log("RESPONSE :",response)
            if(response.exists==false)
            {
               navigate("/")   
            }
        })
        },[loggedInUserData])
    return(
        <div>
           {
            loader?
            <div className="h-screen flex justify-center items-center">
                <p>Loading....</p>
            </div>    
            :
            <div>
                <div className="contest-header grid grid-cols-1 md:grid-cols-2 px-5 sm:px-10 md:px-[50px] lg:px-[100px] py-[50px] bg-[#CAFFEF]">
                        <div className='order-2 md:order-1 pr-2'>
                            <p className='my-2 text-[64px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold'>{contest?.attributes?.title}</p>
                            <p className='my-2 text-[18px] text-black font-helvetica-neue-roman leading-[31.5px] opacity-[70%] '>{contest.attributes?.description}</p>
                            <div className='grid grid-cols-1 space-y-[6px]'>
                                <p className='text-[16px] '>
                                    <span className="leading-[28px] text-overflow-ellipsis font-bold">Difficulty Level:</span><span className=" pl-1">  {contest.attributes?.level}</span> 
                                </p>
                                <p className='my-2 text-[16px] '>
                                    <span className="leading-[28px] text-overflow-ellipsis font-bold">Participants:</span> <span className="pl-1">  {contest.attributes?.participants}</span> 
                                </p>
                                {
                                !timeLeft.status&&
                                <p className='my-2 text-[16px] '>
                                    <span className="leading-[28px] text-overflow-ellipsis font-bold">Start:</span><span className="pl-1"> {formatTimestamp(contest.attributes?.startDate)}</span>
                                </p>
                                }
                                {
                                !timeLeft.status&&
                                <p className='my-2 text-[16px] '>
                                    <span className="leading-[28px] text-overflow-ellipsis font-bold">End:</span><span className="pl-1"> {formatTimestamp(contest.attributes?.endDate)}</span>
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
                                <GreenButton 
                                    text={"Register Now"}
                                    isHoveredReq={true}
                                    onClick={()=>navigate(`/previewcontests/editor/${contest?.id}`)}
                                />
                                }
                            </div>
                        </div>
                        <div className='order-1 md:order-2 flex justify-center md:justify-end items-center'>
                            <LazyLoadImage
                            className="h-[375px] py-2 rounded-[20px]"
                            src={contest?.attributes?.image.data.attributes.url} 
                            />
                        </div>
                </div>
                <div className="contest-details grid grid-cols-2 lg:grid-cols-3 px-5 sm:px-10 md:px-[50px] lg:px-[100px] py-[30px]">
          <div className='col-span-2 md:pr-8'>
             <div className='contest-details-title'>
                 <p className='my-2 text-[64px]  leading-tight text-overflow-ellipsis font-helvetica-neue-bold'>
                   Contest Details
                 </p>
             </div>
             <div className='contest-details-description'>
                 <p className='text-[18px] mt-2 text-black font-helvetica-neue-roman leading-[31.5px] opacity-[70%]'>{contest?.attributes?.details}</p>
             </div>
             {
                rules!==null&& <div>
                    <div className='contest-details-rules py-5'>
                        <p className='text-[18px] font-semibold'>Rules:</p>
                        {rules}
                    </div>
                </div>
                // <div className='contest-details-rules py-5'>
                //     <ul className='mx-1'>
                //     {rules.map((s, index) => (
                //         <li className={`${s.type == 'code' ?'bg-[#d4d2d2] px-5 ':''} py-1`} key={index}>
                //         {
                //             s.type!='code'&&
                //             <span className="w-2 h-2 bg-[#605d5d] rounded-full inline-block mr-2"></span>
                //         }
                //         <span className={` text-[15px] text-slategray font-helvetica-neue-roman leading-[25px]`}>
                //             {s.type == 'link' ? (
                //             <a href={s.url} className="underline text-shardeumBlue" target="_blank" rel="noopener noreferrer">
                //                 {s.content}
                //             </a>
                //             ) : s.type == 'code' ? (
                //                 <CodeBlock
                //                 language="javascript"
                //                 text={s.content}
                //                 theme={dracula}
                //                 className="custom-copy-block"
                //                 />
                //             ) : (
                //             s.content
                //             )}
                //         </span>
                //         </li>
                //     ))}
                //     </ul>
                // </div>
             }
             {
                warnings!=null&&
                <div className='contest-details-rules py-5'>
                    <p className='text-[18px] font-semibold'>Winnings:</p>
                    <ul className='mx-1'>
                        {warnings}
                    {/* {warnings.map((s, index) => (
                        <li className={`${s.type == 'code' ?'bg-[#d4d2d2] px-5 ':''} py-1`} key={index}>
                        {
                            s.type!='code'&&
                            <span className="w-2 h-2 bg-[#605d5d] rounded-full inline-block mr-2"></span>
                        }
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
                    ))} */}

                    </ul>
                </div>
             }
          </div>
          <div className='col-span-1'></div>
    </div>
            </div>    
           }
        </div>
    )
}

export default PreviewContest;