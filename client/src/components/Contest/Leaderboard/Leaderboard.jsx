import { useEffect } from "react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Leaderboard({data})
{
    const [columns,setColumns]=useState([]);
    const [showAll,setShowAll]=useState(3);
    useEffect(()=>{
        let cols = data.length > 0 ? Object.keys(data[0]) : [];
        setColumns(cols);
    },[data])
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
                                    <th className={`px-4 py-8 text-[24px] leading-tight font-helvetica-neue-semibold ${column=="User Name"?'text-left':''}`} key={column}>{column.toUpperCase()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-[20px]">
                            {data.slice(0,showAll).map((item, index) => (
                                    <tr className={`text-center  border-b-[0.5px] ${index<3?'top_3':''} ${index==0?'bg-shardeumGreen':index==1?'bg-[#FBFF1E]':index==2?'bg-[#1EFFFA]':''}`} key={index}>
                                    {columns.map((column) => (
                                        column=="Avatar"?
                                            <td className="px-4 py-5 flex justify-center" key={column}>
                                                <LazyLoadImage
                                                    className=" rounded-[50%] w-14 h-14"
                                                    src={item?.Avatar}   
                                                />
                                            </td>
                                        :
                                        column=="Submission"?
                                            <td className="px-4 py-5" key={column}>
                                                <a className="text-shardeumBlue underline" href={item[column]}>View Submission</a>
                                            </td>
                                            :
                                            <td className={`px-4 py-5 ${column=="User Name"?'text-left':''}  ${column=="Rank"?'font-bold text-[22px]':''} text-[18px]   `} key={column}>{item[column]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                      {
                        data.length>3&&showAll!=10&&
                        <div className={`text-center  h-[50px] flex justify-center items-center`} key={''}>
                             <span className="text-shardeumBlue text-[18px] leading-[18px] cursor-pointer" onClick={()=>setShowAll(10)}>View All</span>
                        </div>
                      }
            </div>
         </div>
    </div>
   )
}  