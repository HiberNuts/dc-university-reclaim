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

};

export default ProfileCourseCard;
