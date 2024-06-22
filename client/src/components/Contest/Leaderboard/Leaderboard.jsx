import { useEffect } from "react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";


import AVATAR from "../../../assets/userdp1.png";
import TRI from "../../../assets/leaderboard_triangle.png";
import ARROW1 from "../../../assets/leaderboard_arrow1.png";
import ARROW2 from "../../../assets/leaderboard_arrow2.png";
import CONFETTI from "../../../assets/svgconfetti.svg"
const LEADERBOARD=[
 {
      "Rank":1,
      "Avatar": "img1",
      "User Name": "Deadpool_Wolverine",
      "XP Points":2000,
      "Prize":"$ 2000"
    },
    {
     "Rank":2,
     "Avatar": "img2",
     "User Name": "Iron_Man",
     "XP Points":2000,
     "Prize":"$ 2000"

   
    },
    {
     "Rank":3,
     "Avatar": "img3",
     "User Name": "Spider_Man",
     "XP Points":2000,
     "Prize":"$ 2000"

    
    },
    {
     "Rank":4,
     "Avatar": "img4",
     "User Name": "Black_Panther",
     "XP Points":2000,
     "Prize":"$ 2000"

   
    },
    {
     "Rank":5,
     "Avatar": "img5",
     "User Name": "Captain_America",
     "XP Points":2000,
     "Prize":"$ 2000"
     
    
    },
    {
     "Rank":6,
     "Avatar": "img6",
     "User Name": "Hulk_Smash",
     "XP Points":2000,
     "Prize":"$ 2000"

    
    },
    {
     "Rank":7,
     "Avatar": "img7",
     "User Name": "Thor_Odin",
     "XP Points":2000,
     "Prize":"$ 2000"

    
    },
    {
     "Rank":8,
     "Avatar": "img8",
     "User Name": "Loki_Chaos",
     "XP Points":2000,
     "Prize":"$ 2000"

    
    },
    {
     "Rank":9,
     "Avatar": "img9",
     "User Name": "Black_Widow",
     "XP Points":2000,
     "Prize":"$ 2000"

    
    },
    {
     "Rank":10,
     "Avatar": "img10",
     "User Name": "Hawkeye_Aim",
     "XP Points":2000,
     "Prize":"$ 2000"

      
 }
]
export default function Leaderboard({className})
{
    const [columns,setColumns]=useState([]);
    const [showAll,setShowAll]=useState(3);
    useEffect(()=>{
        let cols = LEADERBOARD.length > 0 ? Object.keys(LEADERBOARD[0]) : [];
        setColumns(cols);
    },[])
   return(
    <div className="">
         {/* <div className="bg-shardeumBlue px-2 sm:px-[100px] leaderboard_title relative">
                  <div className="contest_name pt-28 pb-10">
                        <p className="mx-4 text-[64px] leading-[80px] font-helvetica-neue-bold  text-shardeumWhite">Contest Name - Leaderboard</p>
                  </div>
                  <img className="absolute right-[7rem] top-2" src={TRI}/>
                  <img className="absolute left-[20rem] top-1" src={ARROW1}/>
                  <img className="absolute left-0 bottom-0" src={ARROW2}/>
         </div> */}
         <div className="bg-shardeumWhite">
            <div className="overflow-hidden rounded-[16px] border-2">
                  <table className="contest_leaderboard min-w-full">
                        <thead>
                            <tr className="text-white bg-black table_head">
                                {columns.map((column) => (
                                    <th className={`px-4 py-8 text-[22px] leading-tight font-helvetica-neue-semibold ${column=="User Name"?'text-left':''}`} key={column}>{column.toUpperCase()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-[20px]">
                            {LEADERBOARD.slice(0,showAll).map((item, index) => (
                                    <tr className={`text-center  border-b-[0.5px] ${index<3?'top_3':''} ${index==0?'bg-shardeumGreen':index==1?'bg-[#FBFF1E]':index==2?'bg-[#1EFFFA]':''}`} key={index}>
                                    {columns.map((column) => (
                                        column=="Avatar"?
                                            <td className="px-4 py-5 flex justify-center" key={column}>
                                                <LazyLoadImage
                                                    className=" rounded-[16px]"
                                                    src={AVATAR}   
                                                />
                                            </td>
                                        :
                                        column=="Submission"?
                                            <td className="px-4 py-5" key={column}>
                                                <a className="text-shardeumBlue underline" href={item[column]}>View Submission</a>
                                            </td>
                                            :
                                            <td className={`px-4 py-5 ${column=="User Name"?'text-left':''}  ${column=="Rank"?'font-bold':''}`} key={column}>{item[column]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                      {
                        showAll!=10&&
                        <div className={`text-center  h-[50px] flex justify-center items-center`} key={''}>
                             <span className="text-shardeumBlue text-[18px] leading-[18px] cursor-pointer" onClick={()=>setShowAll(10)}>View All</span>
                        </div>
                      }
            </div>
         </div>
    </div>
   )
}  