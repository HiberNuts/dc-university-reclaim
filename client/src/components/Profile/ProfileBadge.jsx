import WIN_BADGE from "../../assets/badge/wins.svg";
import CONSISTENT from "../../assets/badge/consistent.svg";
import SPEED from "../../assets/badge/speed.svg";
import ACCURACY from "../../assets/badge/accuracy.svg";
const ProfileBadge=({data,courseData})=>{
 
    if(data?.contestWon>0||(data?.contestParticipated>=5||courseData.enrolledCourses.length>=5)||data?.contestWon>5||data?.XPEarned>5000)    
        return(
        <div>
               <p className='my-2 text-[24px] text-left leading-tight text-black text-overflow-ellipsis font-helvetica-neue-bold pb-3'>Badges</p>
               <div className="mt-5 flex flex-row gap-4">
                {
                    data?.contestWon>0&&
                    <div className="bg-black px-6 py-3 rounded-lg flex flex-col hover:px-8 transition-width duration-500 cursor-pointer">
                        <img src={WIN_BADGE} className="h-16 w-20"/> 
                        <p className="text-[#ced132] leading-tight text-overflow-ellipsis font-semibold text-center text-[10px] pt-3">{data?.contestWon} Win(s)</p> 
                    </div>   
                }
                {
                    (data?.contestParticipated>=5||courseData.enrolledCourses.length>=5)&&
                    <div className="bg-black px-6 py-3 rounded-lg flex flex-col hover:px-8 transition-width duration-500 cursor-pointer">
                        <img src={CONSISTENT}  className="h-16 w-20"/> 
                        <p className="text-[#5bcdc5] leading-tight text-overflow-ellipsis font-semibold text-center text-[10px] pt-3">Consistent</p> 
                    </div>   
                }
                {
                    data?.contestWon>5&&
                    <div className="bg-black px-6 py-3 rounded-lg flex flex-col hover:px-8 transition-width duration-500 cursor-pointer">
                        <img src={ACCURACY}  className="h-16 w-20"/> 
                        <p className="text-[#77b801] leading-tight text-overflow-ellipsis font-semibold text-center text-[10px] pt-3">Accuracy</p> 
                    </div>   
                }
                {
                    data?.XPEarned>5000&&
                    <div className="bg-black px-6 py-3 rounded-lg flex flex-col hover:px-8 transition-width duration-500 cursor-pointer">
                        <img src={SPEED}  className="h-16 w-20"/> 
                        <p className="text-[#fe4d0f] leading-tight text-overflow-ellipsis font-semibold text-center text-[10px] pt-3">Speed</p> 
                    </div>   
                }

                </div> 
        </div>
    )
    else <></>
}

export default ProfileBadge;