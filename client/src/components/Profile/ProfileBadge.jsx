import WIN_BADGE from "../../assets/badge/wins.svg";
import CONSISTENT from "../../assets/badge/consistent.svg";
import SPEED from "../../assets/badge/speed.svg";
import ACCURACY from "../../assets/badge/accuracy.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import notFoundImage from "../../assets/notFound.png";
import NEW_CONTESTWON_BADGE from "../../assets/new_contest_badge.png";
import NEW_PARTICIPATION_BADGE from "../../assets/new_participation_badge.png"
import NEW_XP_BADGE from "../../assets/new_xp_badge.png";
import { LuSearchX } from "react-icons/lu";
const ProfileBadge = ({ data, courseData }) => {
  if (
    data?.contestWon > 0 ||
    data?.contestParticipated >= 5 ||
    courseData.enrolledCourses.length >= 5 ||
    data?.contestWon >= 5 ||
    data?.XPEarned > 500
  )
    return (
      <div>
        <p className="relative text-left  mt-[-1.00px]
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text text-wrap font-montserrat-semibold text-transparent text-[24px] tracking-[0] leading-[50px] whitespace-nowrap">
          Badges
        </p>
        <div className="mt-5 flex flex-row gap-4">
          {data?.contestWon >= 0 && (
            <div className="border-[0.1px] border-decentraBlue flex flex-col rounded-md">
              <img src={NEW_CONTESTWON_BADGE} className="h-32 w-36  rounded-md" />
              <p className="bg-black text-[12px] p-1 rounded-b-md w-full bottom-0">Contest Won ({data?.contestWon})</p>
            </div>

          )}
          {(data?.contestParticipated >= 5 ||
            courseData.enrolledCourses.length >= 5) && (
              <div className="border-[0.1px] border-decentraBlue flex flex-col rounded-md">
                <img src={NEW_PARTICIPATION_BADGE} className="h-32 w-36  rounded-md" />
                <p className="bg-black text-[12px] p-1 rounded-b-md w-full bottom-0">Badge Participation</p>
              </div>
            )}
          {data?.contestWon >= 5 && (
            <div className="bg-black px-6 py-3 rounded-lg flex flex-col hover:px-8 transition-width duration-500 cursor-pointer">
              <img src={ACCURACY} className="h-16 w-20" />
              <p className="text-[#77b801] leading-tight text-overflow-ellipsis font-semibold text-center text-[10px] pt-3">
                Accuracy
              </p>
            </div>
          )}
          {data?.XPEarned >= 500 && (
            <div className="border-[0.1px] border-decentraBlue flex flex-col rounded-md">
              <img src={NEW_XP_BADGE} className="h-32 w-36  rounded-md" />
              <p className="bg-black text-[12px] p-1 rounded-b-md w-full bottom-0">High XP</p>

            </div>
          )}
        </div>
      </div >
    );
  else
    return (
      <div>
        <p className="bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text text-wrap font-montserrat-semibold text-transparent text-[24px] tracking-[0] leading-[50px] whitespace-nowrap">
          Badges
        </p>
        <div className="text-center p-10 flex justify-center items-center">
          <LuSearchX className="text-white text-[50px]" />
          <p className="text-white text-[24px]">No badges Yet</p>
        </div>
      </div>
    );
};

export default ProfileBadge;
