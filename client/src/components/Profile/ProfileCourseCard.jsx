import React, { useEffect, useRef, useState } from "react";
// import "./CourseCard.css";
import timeIcon from "../../assets/timeIcon.svg";
import profileIcon from "../../assets/profileIcon.svg";
import levelIcon from "../../assets/levelIcon.svg";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { getUserCourseProgressPercentage } from "../../utils/api/CourseAPI";
import { generateSlug } from "../../utils/generateSlug";
import { CourseCard } from "../Home/CohortsAndLearning";
const ProfileCourseCard = ({ props, loggedInUserData, userData }) => {
  const scrollRef = useRef(null);

  const [currentCourseProgress, setcurrentCourseProgress] = useState({
    chapterCompletionPercentage: 0,
    moduleCompletionPercentage: 0,
    overallCompletionPercentage: 0,
    quizCompletionPercentage: 0,
  });

  const getProgressPercentage = async () => {
    const data = await getUserCourseProgressPercentage({
      courseId: props?._id,
      userId: loggedInUserData?._id,
      accessToken: loggedInUserData?.accessToken,
    });

    setcurrentCourseProgress(data);
  };

  useEffect(() => {
    getProgressPercentage();
  }, [loggedInUserData, userData]);

  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["0 3", "1 1"] });

  return (
    <Link to={`/workplace/${generateSlug(props?.title)}`}>
      <CourseCard
        title={props?.title}
        image={props?.banner}
        description={props?.description}
        resumeCourse={userData._id == loggedInUserData._id && (
          <div className="w-full mb-4">
            <div className="w-full h-4 rounded-full border-[0.1px] border-decentraBlue bg-transparent">
              <div
                style={{
                  width: `${parseInt(currentCourseProgress?.overallCompletionPercentage)}%`,
                }}
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
              />
            </div>
            <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-[15px] tracking-[0] leading-7 mt-2">
              Course {parseInt(currentCourseProgress?.overallCompletionPercentage)
                ? parseInt(currentCourseProgress?.overallCompletionPercentage)
                : 0}% completed
            </p>
          </div>
        )}
      />
    </Link>
  )
  return (
    <Link to={`/workplace/${generateSlug(props?.title)}`}>
      <motion.div
        ref={scrollRef}
        style={{
          scale: scrollYProgress,
          opacity: scrollYProgress,
          boxShadow: "0px 4px 20px 0px rgba(195, 200, 255, 0.30)",
        }}
        className="flex card-container col-span-1 font-helvetica-neue max-h-[600px] bg-white border-[3px] shadow flex-col justify-center align-middle rounded-[16px]"
      >
        <div className="image-section h-full gap-4 flex flex-col justify-between  p-[15px]">
          <div className="flex justify-center  align-middle items-center">
            <img className="w-[360px] h-[230px] rounded-[16px]" src={props?.banner} />
          </div>
          <div className="description-section  flex flex-col justify-center align-middle">
            <div className="title-container overflow-hidden">
              <p className="text-[24px] text-overflow-ellipsis font-helvetica-neue-bold font-bold">{props?.title}</p>
            </div>
            {/* <p className="text-[16px] text-slategray font-helvetica-neue-roman font-thin">
              {props?.description?.slice(0, 180) + (props?.description?.length > 180 ? "..." : "")}
            </p> */}
          </div>
          <div className="description-section flex  flex-col w-full">
            <div className="flex h-8 w-8 object-contain ">
              <img
                class="inline-block w-full h-full  rounded-full object-contain ring-2 ring-white mt-1"
                src="https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/4238c25d47bc0b871b0b61ab6fcaeea6.png"
                alt=""
              />
              <p className="text-[18px] flex flex-col justify-center h-full items-center text-center font-semibold ml-2">Shardeum</p>
            </div>
            <div className="flex justify-evenly align-middle w-full"></div>
          </div>
          <div className="flex w-full  justify-evenly align-middle ">
            <div className="flex gap-2 ">
              <img className="w-5 h-5 mt-1 " src={timeIcon} />
              <span className="font-helvetica-neue">{props?.duration} hrs</span>
            </div>
            <p>|</p>
            <div className="flex gap-2">
              <img className="w-5 h-5 mt-1" src={profileIcon} />
              <span className="font-helvetica-neue">{props?.__v} Students</span>
            </div>
            <p>|</p>
            <div className="flex gap-2">
              <img className="w-5 h-5 mt-1" src={levelIcon} />
              <span className="font-helvetica-neue">{props?.level}</span>
            </div>
          </div>
          { }


        </div>
      </motion.div>
    </Link>

  );
};

export default ProfileCourseCard;
