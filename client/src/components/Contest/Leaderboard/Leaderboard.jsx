import { useEffect } from "react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

import dollarSign from "../../../assets/dollar-sign.svg"
import image41 from "../../../assets/image-41.png"
import maskGroup3 from "../../../assets/mask-group-3.png"
import maskGroup4 from "../../../assets/mask-group-4.png"
import maskGroup from "../../../assets/mask-group.png"
import image1 from "../../../assets/imageBG.png"
import line672 from "../../../assets/line-67-2.svg";
import line673 from "../../../assets/line-67-3.svg";
import line67 from "../../../assets/line-67-4.svg";
import line682 from "../../../assets/line-68-2.svg";
import line68 from "../../../assets/line-68-3.svg";
import line692 from "../../../assets/line-69-2.svg";
import line693 from "../../../assets/line-69-3.svg";
import line69 from "../../../assets/line-69-4.svg";
import line702 from "../../../assets/line-70-2.svg";
import line703 from "../../../assets/line-70-3.svg";
import line70 from "../../../assets/line-70-4.svg";
import image18 from "../../../assets/image-18.png"
import image from"../../../assets/line-70-6.svg"

export default function Leaderboard({data})
{
    const [columns,setColumns]=useState([]);
    const [showAll,setShowAll]=useState(3);
    useEffect(()=>{
        const cols = data.length > 0 ? Object.keys(data[0]) : [];
        setColumns(cols);
    },[data])
//    return(
//     <div className="">  
//          {/* <div className="bg-shardeumBlue px-2 sm:px-[100px] leaderboard_title relative">
//                   <div className="contest_name pt-28 pb-10">
//                         <p className="mx-4 text-[64px] leading-[80px] font-helvetica-neue-bold  text-shardeumWhite">Contest Name - Leaderboard</p>
//                   </div>
//                   <img className="absolute right-[7rem] top-2" src={TRI}/>
//                   <img className="absolute left-[20rem] top-1" src={ARROW1}/>
//                   <img className="absolute left-0 bottom-0" src={ARROW2}/>
//          </div> */}
//          {/* <div className="bg-shardeumWhite">
//             <div className="rounded-[16px] border-2 overflow-x-auto">
//                   <table className="contest_leaderboard min-w-full">
//                         <thead>
//                             <tr className="text-white bg-black table_head">
//                                 {columns.map((column) => (
//                                     <th className={`px-4 py-8 text-[24px] leading-tight font-helvetica-neue-semibold ${column=="User Name"?'text-left':''}`} key={column}>{column.toUpperCase()}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody className="text-[20px] cursor-pointer">
//                             {data.slice(0,showAll).map((item, index) => (
//                                     <tr className={`text-center  border-b-[0.5px] ${index<3?'top_3':''} ${index==0?'bg-shardeumGreen':index==1?'bg-[#FBFF1E]':index==2?'bg-[#1EFFFA]':''}`} key={index}
//                                     onClick={()=>window.open(`/${item["User Name"]}`,'_blank')}
//                                     >
//                                     {columns.map((column) => (
//                                         column=="Avatar"?
//                                             <td className="px-4 py-5 flex justify-center" key={column}>
//                                                 <LazyLoadImage
//                                                     className=" rounded-[50%] w-14 h-14"
//                                                     src={item?.Avatar}   
//                                                 />
//                                             </td>
//                                         :
//                                         column=="Submission"?
//                                             <td className="px-4 py-5" key={column}>
//                                                 <a className="text-shardeumBlue underline" href={item[column]}>View Submission</a>
//                                             </td>
//                                             :
//                                             <td className={`px-4 py-5 ${column=="User Name"?'text-left':''}  ${column=="Rank"?'font-bold text-[22px]':''} text-[18px]   `} key={column}>{item[column]}</td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                       {
//                         data.length>3&&showAll!=10&&
//                         <div className={`text-center  h-[50px] flex justify-center items-center`} key={''}>
//                              <span className="text-shardeumBlue text-[18px] leading-[18px] cursor-pointer" onClick={()=>setShowAll(10)}>View All</span>
//                         </div>
//                       }
//             </div>
//          </div> */}
//     </div>
//    )

const renderBackgroundEffects = (index) => (
    <div className="w-full h-[72px] overflow-hidden absolute top-0 left-0">
        <div className="relative w-full h-[578px] -top-px left-[-7px]">
            <div className="absolute w-[943px] h-64 top-8 left-0">
                <div className={`absolute w-[293px] h-64 top-0 left-[650px] rounded-[146.67px/128px]`}>
                    <div className={`absolute w-[293px] h-64 top-0 left-0 ${index === 0 ? 'bg-[#61dd38]' :
                            index === 1 ? 'bg-[#ffc226]' :
                                index === 2 ? 'bg-[#ff4b53]' : ''
                        } rounded-[146.67px/128px] blur-[266.67px] opacity-50`} />
                </div>
                <div className={`absolute w-[293px] h-64 top-0 left-0 ${index === 0 ? 'bg-[#61dd38]' :
                        index === 1 ? 'bg-[#ffc226]' :
                            index === 2 ? 'bg-[#ff4b53]' : ''
                    } rounded-[146.67px/128px] blur-[266.67px] opacity-50`} />
            </div>
            <img className="absolute w-[53px] h-[72px] top-px left-[858px]" alt="Line" src={line673} />
            <img className="absolute w-[35px] h-[59px] top-3.5 left-[884px]" alt="Line" src={line68} />
            <img className="absolute w-[53px] h-[72px] top-px left-[682px]" alt="Line" src={line693} />
            <img className="absolute w-[35px] h-[59px] top-3.5 left-[675px]" alt="Line" src={line70} />
        </div>
    </div>
);

const renderTrophy = (index) => {
    if (index > 2) return null;
    return (
        <div className="absolute w-[184px] h-[184px] top-0 left-[711px]">
            <div className={`relative w-[244px] h-[72px] top-px left-[-30px] bg-[url(assets/trophy-${index + 1}.png)] bg-cover bg-[20%_20%]`}>
                <img
                    className="absolute w-[244px] -top-[35px] left-0 mix-blend-color"
                    alt="Mask group"
                    src={index === 0 ? maskGroup3 : index === 1 ? maskGroup4 : maskGroup}
                />
            </div>
        </div>
    );
};

return (
    <div className="flex flex-col gap-10 pt-[60px] pb-20 self-stretch w-full items-start relative flex-[0_0_auto]">
        <div className="flex-col items-start justify-center rounded-[20px] overflow-hidden border-2 border-solid border-[#5d89ff] shadow-[0px_0px_200px_#3a59fe80] flex relative self-stretch w-full flex-[0_0_auto]">
            {/* Header */}
            <div className="w-full items-center [background:linear-gradient(180deg,rgb(92.65,136.59,255)_0%,rgb(58,89,254)_100%)] flex relative flex-[0_0_auto]">
                <div className="w-full h-[84px] overflow-hidden absolute top-0 left-0">
                    <div className="relative w-full h-[819px] top-[-170px]">
                        <div className="opacity-[0.13] absolute w-full h-[500px] top-[170px] left-0">
                            <img className="w-full h-full absolute top-0 left-0" alt="Mask group" src={image1} />
                        </div>
                        <div className="absolute w-[500px] h-[500px] top-0 left-[390px] bg-[#5d89ff] rounded-[250px] blur-[300px] opacity-20" />
                    </div>
                </div>
                {/* Header columns */}
                <div className="flex flex-col w-[150px] items-center justify-center px-4 sm:px-11 py-8 relative">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-xl tracking-[2.40px] leading-5 whitespace-nowrap">
                        RANK
                    </div>
                </div>
                <div className="flex flex-col w-[200px] items-center justify-center px-4 sm:px-11 py-8 relative">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-xl tracking-[2.40px] leading-5 whitespace-nowrap">
                        AVATAR
                    </div>
                </div>
                <div className="flex flex-col w-[510px] items-start justify-center px-4 sm:px-11 py-8 relative">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-xl tracking-[2.40px] leading-5 whitespace-nowrap">
                        USER NAME
                    </div>
                </div>
                <div className="flex flex-col w-[200px] items-center justify-center px-4 sm:px-11 py-8 relative">
                    <div className="relative w-fit mt-[-1.00px] ml-[-2.50px] mr-[-2.50px] [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-xl tracking-[2.40px] leading-5 whitespace-nowrap">
                        XP POINTS
                    </div>
                </div>
                <div className="flex flex-col w-[220px] items-center justify-center px-4 sm:px-11 py-8 relative">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-xl tracking-[2.40px] leading-5 whitespace-nowrap">
                        PRIZE
                    </div>
                </div>
                {/* ... Add other header columns similarly ... */}
            </div>

            {/* Leaderboard rows */}
            {data.slice(0, showAll).map((item, index) => (
                <div key={index} className={`items-center border-b [border-bottom-style:solid] border-[#ffffff33] flex relative self-stretch w-full flex-[0_0_auto] ${index === 0 ? 'bg-[#61dd38]/15' :
                        index === 1 ? 'bg-[#ffc226]/15' :
                            index === 2 ? 'bg-[#ff4b53]/15' :
                                'bg-[#121212]'
                    }`}>
                    {renderBackgroundEffects(index)}
                    {renderTrophy(index)}

                    {/* Rank */}
                    <div className="flex w-[150px] h-[72px] items-center justify-center px-4 sm:px-11 py-0 relative">
                        <div className="relative w-fit [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                            {index + 1}
                        </div>
                        {index < 3 && (
                            <div className={`absolute w-[26px] h-[26px] top-[22px] left-[35px] bg-[url(assets/mask-group-${(index + 1) * 2}.png)] bg-[100%_100%]`} />
                        )}
                    </div>

                    {/* Avatar */}
                    <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-4 sm:px-11 py-0 relative">
                        <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden">
                            <LazyLoadImage
                                className="absolute w-12 h-12 top-0 left-0 object-cover"
                                alt="Avatar"
                                src={item.Avatar || image18}
                            />
                        </div>
                    </div>

                    {/* User Name */}
                    <div className="flex flex-col h-[72px] items-start justify-center px-4 sm:px-11 py-0 relative flex-1 grow">
                        <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                            {item["User Name"]}
                        </div>
                    </div>

                    {/* XP Points */}
                    <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-4 sm:px-11 py-0 relative">
                        <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                            {item["XP Points"]}
                        </div>
                    </div>

                    {/* Prize */}
                    <div className="flex flex-col w-[220px] h-[72px] items-center justify-center px-4 sm:px-11 py-0 relative">
                        <div className="inline-flex items-center justify-center relative flex-[0_0_auto]">
                            <img className="relative w-5 h-5" alt="Lucide dollar sign" src={dollarSign} />
                            <div className="relative w-[41px] h-3.5 [font-family:'Helvetica_Neue_LT_Pro-Md',Helvetica] font-normal text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                                {item.Prize || '--'}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* View All button */}
        {data.length > 3 && showAll !== 10 && (
            <div className="text-center h-[50px] flex justify-center items-center w-full">
                <span className="text-shardeumBlue text-[18px] leading-[18px] cursor-pointer" onClick={() => setShowAll(10)}>
                    View All
                </span>
            </div>
        )}
    </div>
);
}  