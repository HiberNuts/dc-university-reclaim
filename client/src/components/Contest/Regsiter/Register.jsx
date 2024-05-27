import CONTEST_IMG from '../../../assets/contest.png';
import { LazyLoadImage } from "react-lazy-load-image-component";
import GreenButton from '../../button/GreenButton';

export default function ContestRegsiter(){
       let contentDescription="Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum Ensure rapid development and build powerful Linearly rapid development and build powerful Linearly";
       let rules=[
        "The Web3 Code Challenge is a 36-hour IRL event with full of fun, awards, knowledge, skills, and challenges for all developers including Web2 and Web3 developers. The Web3 Code Challenge consists of a BIG",
        "CHALLENGE and SMALL CHALLENGES. In the BIG CHALLENGE, participants with their teams will have the opportunity to challenge themselves to make ideas and build tools and projects based on specific",
        "topics related to both Web2 and Web3. SMALL CHALLENGES is designed for individual developers and will pop up every 3 hours for  all participants to challenge themselves and be ranked in the list to win instant awards for each small challenge, and win medals for the final ranking list at the end of events."
       ]
      return (
            <div className="bg-white border-2 px-20">
                   <div className="contest-header grid grid-cols-2 py-3">
                         <div className='pr-2'>
                             <p className='my-2 text-[40px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold text-shardeumBlue'>Contest Name</p>
                             <p className='my-2 text-[15px] text-slategray font-helvetica-neue-roman leading-[25px] '>{contentDescription}</p>
                             <p className='my-2 text-[15px]'>
                                <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Difficulty Level:</span><span className="text-[14px] pl-1">  Easy</span> 
                             </p>
                             <p className='my-2 text-[15px]'>
                                <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Participants:</span> <span className="text-[14px] pl-1">  100</span> 
                             </p>
                             <p className='my-2 text-[15px]'>
                                <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Start:</span><span className="text-[14px] pl-1">  May 21, 2024 7:30AM (GMT+5:30)</span>
                             </p>
                             <p className='my-2 text-[15px]'>
                                 <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">End:</span><span className="text-[14px] pl-1">  May 21, 2024 7:30AM (GMT+5:30)</span>
                             </p>
                             {/* When the contest is live  */}
                             {/* <p className='my-2 text-[15px]'>
                                 <span className="leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Ending in:</span> <span className="text-red-500 pl-1"> 2d : 11h :59m :22s</span>
                             </p>  */}
                             <div className='py-2'>
                                 <GreenButton text={"Start Now"}/>
                             </div>
                         </div>
                         <div className='flex justify-center items-center'>
                            <LazyLoadImage
                            className="h-[320px] px-10 py-10 rounded-[16px]"
                            src={CONTEST_IMG}   
                            />
                         </div>
                   </div>
                   <div className="contest-details py-5 grid grid-cols-3">
                         <div className='col-span-2'>
                            <div className='contest-details-title'>
                                <p className='my-2 text-[40px]  leading-tight text-overflow-ellipsis font-helvetica-neue-bold'>
                                    Contest Details
                                </p>
                            </div>
                            <div className='contest-details-description'>
                                <p className='text-[15px] mt-2 text-slategray font-helvetica-neue-roman leading-[25px]'>The Web3 Code Challenge is a 36-hour IRL event with full of fun, awards, knowledge, skills, and challenges for all developers including Web2 and Web3 developers. The Web3 Code Challenge consists of a BIG CHALLENGE and SMALL CHALLENGES. In the BIG CHALLENGE, participants with their teams will have the opportunity to challenge themselves to make ideas and build tools and projects based on specific topics related to both Web2 and Web3. SMALL CHALLENGES is designed for individual developers and will pop up every 3 hours for  all participants to challenge themselves and be ranked in the list to win instant awards for each small challenge, and win medals for the final ranking list at the end of events.</p>
                            </div>
                            <div className='contest-details-rules py-5'>
                                <p className='text-[15px] font-semibold'>Rules:</p>
                                <ul className='mx-1'>
                                    {rules.map(s=>
                                    <li className='py-1'>
                                        <span className="w-2 h-2 bg-[#605d5d] rounded-full inline-block mr-2"></span>
                                        <span className='text-[15px]  text-slategray font-helvetica-neue-roman leading-[25px]'>{s}</span>
                                    </li>
                                    )}
                                </ul>
                            </div>
                            <div className='contest-details-rules py-5'>
                                <p className='text-[15px] font-semibold'>Winnings:</p>
                                <ul className='mx-1'>
                                    {rules.map(s=>
                                    <li className='py-1'>
                                        <span className="w-2 h-2 bg-[#605d5d] rounded-full inline-block mr-2"></span>
                                        <span className='text-[15px]  text-slategray font-helvetica-neue-roman leading-[25px]'>{s}</span>
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