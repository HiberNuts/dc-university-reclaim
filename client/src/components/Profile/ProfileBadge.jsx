import WIN_BADGE from "../../assets/badge/wins.svg";
import CONSISTENT from "../../assets/badge/consistent.svg";
const ProfileBadge=({data})=>{
    return(
        <div>
               <p className='my-2 text-[24px] text-left leading-tight text-black text-overflow-ellipsis font-helvetica-neue-bold pb-3'>Badges</p>
               <div className="mt-5 flex flex-row gap-4">
                {
                    data?.contestWon>0&&
                    <div className="bg-black px-6 py-3 rounded-lg flex flex-col hover:px-8 transition-width duration-500 cursor-pointer">
                        <img src={WIN_BADGE} className="h-16 w-20"/> 
                        <p className="text-[#ced132] leading-tight text-overflow-ellipsis font-semibold text-center text-[10px] pt-3">{data?.contestWon} Wins</p> 
                    </div>   
                }
                {
                    data?.contestParticipated>10&&
                    <div className="bg-black px-6 py-3 rounded-lg flex flex-col hover:px-8 transition-width duration-500 cursor-pointer">
                        <img src={CONSISTENT}  className="h-16 w-20"/> 
                        <p className="text-[#5bcdc5] leading-tight text-overflow-ellipsis font-semibold text-center text-[10px] pt-3">Consistent</p> 
                    </div>   
                }

                </div> 
        </div>
    )
}

export default ProfileBadge;