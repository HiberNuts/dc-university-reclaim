import { useEffect } from "react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";


import AVATAR from "../../../assets/userdp1.png";

const LEADERBOARD=[
 {
      "Rank":1,
      "Avatar": "img1",
      "Id": "Deadpool_Wolverine",
      "Test Cases": 14,
      "Timing": "11:23:45",
      "Submission": "https://linkedin.com/in/user1"
    },
    {
     "Rank":2,
     "Avatar": "img2",
     "Id": "Iron_Man",
     "Test Cases": 9,
     "Timing": "07:34:29",
     "Submission": "https://linkedin.com/in/user2"
    },
    {
     "Rank":3,
     "Avatar": "img3",
     "Id": "Spider_Man",
     "Test Cases": 18,
     "Timing": "05:16:01",
     "Submission": "https://linkedin.com/in/user3"
    },
    {
     "Rank":4,
     "Avatar": "img4",
     "Id": "Black_Panther",
     "Test Cases": 13,
     "Timing": "19:22:53",
     "Submission": "https://linkedin.com/in/user4"
    },
    {
     "Rank":5,
     "Avatar": "img5",
     "Id": "Captain_America",
     "Test Cases": 7,
     "Timing": "14:44:12",
     "Submission": "https://linkedin.com/in/user5"
    },
    {
     "Rank":6,
     "Avatar": "img6",
     "Id": "Hulk_Smash",
     "Test Cases": 16,
     "Timing": "10:18:34",
     "Submission": "https://linkedin.com/in/user6"
    },
    {
     "Rank":7,
     "Avatar": "img7",
     "Id": "Thor_Odin",
     "Test Cases": 12,
     "Timing": "08:39:57",
     "Submission": "https://linkedin.com/in/user7"
    },
    {
     "Rank":8,
     "Avatar": "img8",
     "Id": "Loki_Chaos",
     "Test Cases": 19,
     "Timing": "21:15:42",
     "Submission": "https://linkedin.com/in/user8"
    },
    {
     "Rank":9,
     "Avatar": "img9",
     "Id": "Black_Widow",
     "Test Cases": 10,
     "Timing": "06:11:05",
     "Submission": "https://linkedin.com/in/user9"
    },
    {
     "Rank":10,
     "Avatar": "img10",
     "Id": "Hawkeye_Aim",
     "Test Cases": 15,
     "Timing": "17:59:23",
     "Submission": "https://linkedin.com/in/user10"
 }
]
export default function Leaderboard({className})
{
    const [columns,setColumns]=useState([]);
    useEffect(()=>{
        let cols = LEADERBOARD.length > 0 ? Object.keys(LEADERBOARD[0]) : [];
        setColumns(cols);
    },[])
   return(
    <div className="">
         <div className="bg-shardeumBlue px-2 sm:px-[100px]">
                  <div className="contest_name pt-28 pb-10">
                        <p className="mx-4 text-[50px] leading-tight font-helvetica-neue-bold  text-shardeumWhite">Contest Name - Leaderboard</p>
                  </div>
         </div>
         <div className="bg-shardeumWhite px-10 sm:px-[120px] py-[50px]">
            <div className="overflow-hidden rounded-lg border-2">
                  <table className="contest_leaderboard min-w-full">
                        <thead>
                            <tr className="text-white bg-black">
                                {columns.map((column) => (
                                    <th className="px-4 py-8 text-[22px] leading-tight font-helvetica-neue-semibold" key={column}>{column.toUpperCase()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-[25px]">
                            {LEADERBOARD.map((item, index) => (
                               index<3?
                                        <tr className="text-center bg-shardeumGreen border-b-[0.5px]" key={index}>
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
                                                    <td className="px-4 py-5" key={column}>{item[column]}</td>
                                            ))}
                                        </tr>
                                        : 
                                        <tr className="text-center" key={index}>
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
                                                    <td className="px-4 py-5" key={column}>{item[column]}</td>
                                            ))}
                                        </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
         </div>
    </div>
   )
}  