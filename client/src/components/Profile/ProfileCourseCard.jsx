import React, { useEffect, useRef, useState } from "react";
// import "./CourseCard.css";
import timeIcon from "../../assets/timeIcon.svg";
import profileIcon from "../../assets/profileIcon.svg";
import levelIcon from "../../assets/levelIcon.svg";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { getUserCourseProgressPercentage } from "../../utils/api/CourseAPI";
import { generateSlug } from "../../utils/generateSlug";

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
    console.log(data);
    setcurrentCourseProgress(data);
  };

  useEffect(() => {
    getProgressPercentage();
  }, [loggedInUserData, userData]);

  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["0 3", "1 1"] });

  return (
    <Link to={`/workplace/${generateSlug(props?.title)}`}>
      <motion.div
        ref={scrollRef}
        style={{
          scale: scrollYProgress,
          opacity: scrollYProgress,
          boxShadow: "0px 4px 20px 0px rgba(195, 200, 255, 0.30)",
        }}
        className="flex card-container font-helvetica-neue h-[600px] bg-white border-[3px] shadow flex-col justify-center align-middle w-[400px] rounded-[16px]"
      >
        <div className="image-section h-full flex flex-col justify-between  p-[20px]">
          <div className="flex justify-center  align-middle items-center">
            <img className="w-[360px] h-[230px] rounded-[16px]" src={props?.banner} />
          </div>
          <div className="description-section  flex flex-col justify-center align-middle">
            <div className="title-container h-[4rem] overflow-hidden">
              <p className="text-[2vh] text-overflow-ellipsis font-helvetica-neue-bold font-bold">{props?.title}</p>
            </div>
            <p className="text-[16px] text-slategray font-helvetica-neue-roman font-thin">
              {props?.description.slice(0, 180) + (props?.description.length > 180 ? "..." : "")}
            </p>
          </div>
          <div className="description-section flex  flex-col w-full">
            <div className="flex ">
              <img
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white mt-1"
                src="https://pbs.twimg.com/profile_images/1660782439340576768/9rIZjmMt_400x400.jpg"
                alt=""
              />
              <p className="text-[18px] items-center text-center font-semibold ml-2">Shardeum</p>
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
              <span className="font-helvetica-neue">{props?.usersEnrolled?.length} Students</span>
            </div>
            <p>|</p>
            <div className="flex gap-2">
              <img className="w-5 h-5 mt-1" src={levelIcon} />
              <span className="font-helvetica-neue">{props?.level}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div className="bg-gray-200 relative h-6 w-full rounded-2xl">
              <div
                style={{
                  width: `${parseInt(currentCourseProgress?.overallCompletionPercentage)}%`,
                }}
                className="bg-shardeumOrange h-full absolute top-0 left-0 flex items-center justify-center rounded-2xl text-sm font-semibold text-shardeumBlue"
              >
                <span className="ml-10">
                  {parseInt(currentCourseProgress?.overallCompletionPercentage)
                    ? parseInt(currentCourseProgress?.overallCompletionPercentage)
                    : 0}
                </span>
                %
              </div>
            </div>
          </div>
          {/* <OrangeButton title={"Start Learning"} style={"w-full h-[40px]"} /> */}
        </div>
      </motion.div>
    </Link>
    // <Link to={`/workplace/${generateSlug(props?.title)}`}>
    //   <motion.div
    //     ref={scrollRef}
    //     style={{
    //       scale: scrollYProgress,
    //       opacity: scrollYProgress,
    //       boxShadow: "0px 4px 20px 0px rgba(195, 200, 255, 0.30);",
    //     }}
    //     className="flex card-container  h-[550px] bg-white dark:border-2 dark:border-shardeumPurple flex-col justify-center align-middle w-[400px] rounded-[16px]"
    //   >
    //     <div className="image-section h-full flex flex-col justify-between py-2  px-[20px]">
    //       <div className="flex justify-center align-middle items-center">
    //         <img className="w-[360px] h-[200px] rounded-[16px]" src={props?.banner} />
    //       </div>
    //       <div className="description-section flex flex-col justify-center align-middle">
    //         <p className="text-[22px] font-bold">{props?.title}</p>
    //         <p className="text-[1rem] ">{props?.description}</p>
    //       </div>
    //       <div className="description-section flex flex-col w-full">
    //         <div className="flex ">
    //           <img
    //             class="inline-block h-6 w-6 rounded-full ring-2 ring-white mt-1"
    //             src="https://pbs.twimg.com/profile_images/1660782439340576768/9rIZjmMt_400x400.jpg"
    //             alt=""
    //           />
    //           <p className="text-[18px] items-center text-center font-semibold ml-2">Shardeum</p>
    //         </div>
    //         <div className="flex justify-evenly align-middle w-full"></div>
    //       </div>
    //       <div className="flex w-full justify-evenly align-middle">
    //         <div className="flex gap-2">
    //           <img className="w-5 h-5 mt-1" src={timeIcon} />
    //           <span>{props?.duration} hrs</span>
    //         </div>
    //         <p>|</p>
    //         <div className="flex gap-2">
    //           <img className="w-5 h-5 mt-1" src={profileIcon} />
    //           <span>{props?.usersEnrolled?.length} Students</span>
    //         </div>
    //         <p>|</p>
    //         <div className="flex gap-2">
    //           <img className="w-5 h-5 mt-1" src={levelIcon} />
    //           <span>{props?.level}</span>
    //         </div>
    //       </div>

    //       <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
    //         <div className="bg-gray-200 relative h-6 w-full rounded-2xl">
    //           <div
    //             style={{
    //               width: `${parseInt(currentCourseProgress?.overallCompletionPercentage)}%`,
    //             }}
    //             className="bg-shardeumOrange h-full absolute top-0 left-0 flex items-center justify-center rounded-2xl text-sm font-semibold text-white"
    //           >
    //             {parseInt(currentCourseProgress?.overallCompletionPercentage)}%
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </motion.div>
    // </Link>
  );
};

export default ProfileCourseCard;
