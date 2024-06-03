import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import CONTEST_IMG from '../../../assets/contest.png';
import GreenButton from '../../button/GreenButton';

export default function ContestRegsiter(){
       const navigate=useNavigate();
       const handleRegister=()=>{
         navigate('/editor');
       }
       let contentDescription="Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum Ensure rapid development and build powerful Linearly rapid development and build powerful Linearly";
       let rules=[
        "The Web3 Code Challenge is a 36-hour IRL event with full of fun, awards, knowledge, skills, and challenges for all developers including Web2 and Web3 developers. The Web3 Code Challenge consists of a BIG",
        "CHALLENGE and SMALL CHALLENGES. In the BIG CHALLENGE, participants with their teams will have the opportunity to challenge themselves to make ideas and build tools and projects based on specific",
        "topics related to both Web2 and Web3. SMALL CHALLENGES is designed for individual developers and will pop up every 3 hours for  all participants to challenge themselves and be ranked in the list to win instant awards for each small challenge, and win medals for the final ranking list at the end of events."
       ]
      return (
            <div className="bg-white pb-10">
                   <div className="contest-header grid grid-cols-1 md:grid-cols-2 px-5 sm:px-10 md:px-[50px] lg:px-[100px] py-[50px]">
                         <div className='order-2 md:order-1 pr-2'>
                             <p className='my-2 text-[64px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold text-shardeumBlue'>Contest Name</p>
                             <p className='my-2 text-[18px] text-black font-helvetica-neue-roman leading-[31.5px] opacity-[70%] '>{contentDescription}</p>
                             <div className='grid grid-cols-1 space-y-[6px]'>
                                <p className='text-[16px] '>
                                    <span className="leading-[28px] text-overflow-ellipsis font-bold">Difficulty Level:</span><span className=" pl-1">  Easy</span> 
                                </p>
                                <p className='my-2 text-[16px] '>
                                    <span className="leading-[28px] text-overflow-ellipsis font-bold">Participants:</span> <span className="pl-1">  100</span> 
                                </p>
                                <p className='my-2 text-[16px] '>
                                    <span className="leading-[28px] text-overflow-ellipsis font-bold">Start:</span><span className="pl-1">  May 21, 2024 7:30AM (GMT+5:30)</span>
                                </p>
                                <p className='my-2 text-[16px] '>
                                    <span className="leading-[28px] text-overflow-ellipsis font-bold">End:</span><span className="pl-1">  May 21, 2024 7:30AM (GMT+5:30)</span>
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
                            src={CONTEST_IMG} 
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
                                <p className='text-[18px] mt-2 text-black font-helvetica-neue-roman leading-[31.5px] opacity-[70%]'>The Web3 Code Challenge is a 36-hour IRL event with full of fun, awards, knowledge, skills, and challenges for all developers including Web2 and Web3 developers. The Web3 Code Challenge consists of a BIG CHALLENGE and SMALL CHALLENGES. In the BIG CHALLENGE, participants with their teams will have the opportunity to challenge themselves to make ideas and build tools and projects based on specific topics related to both Web2 and Web3. SMALL CHALLENGES is designed for individual developers and will pop up every 3 hours for  all participants to challenge themselves and be ranked in the list to win instant awards for each small challenge, and win medals for the final ranking list at the end of events.</p>
                            </div>
                            <div className='contest-details-rules py-5'>
                                <p className='text-[18px] font-semibold'>Rules:</p>
                                <ul className='mx-1'>
                                    {rules.map(s=>
                                    <li className='py-1'>
                                        <span className="w-2 h-2 bg-[#605d5d] rounded-full inline-block mr-2"></span>
                                        <span className='text-[18px]  text-black font-helvetica-neue-roman leading-[31.5px] opacity-[70%]'>{s}</span>
                                    </li>
                                    )}
                                </ul>
                            </div>
                            <div className='contest-details-rules py-5'>
                                <p className='text-[18px] font-semibold'>Winnings:</p>
                                <ul className='mx-1'>
                                    {rules.map(s=>
                                        <li className='py-1'>
                                            <span className="w-2 h-2 bg-[#605d5d] rounded-full inline-block mr-2"></span>
                                            <span className='text-[18px]  text-black font-helvetica-neue-roman leading-[31.5px] opacity-[70%]'>{s}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                         </div>
                         <div className='col-span-1'></div>
                   </div>
            </div>
      )
}