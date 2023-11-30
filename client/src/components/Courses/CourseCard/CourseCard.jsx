import React, { useRef } from "react";
import "./CourseCard.css";
import timeIcon from "../../../assets/timeIcon.svg";
import profileIcon from "../../../assets/profileIcon.svg";
import levelIcon from "../../../assets/levelIcon.svg";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import GreenButton from "../../button/GreenButton";

const CourseCard = ({ props }) => {
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["0 3", "1 1"] });
  return (
    <Link className="z-10" to={`/course/${props?.title.split(" ").join("-")}`}>
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
          <div className="flex justify-center align-middle items-center">
            <img className="w-[360px] h-[230px] rounded-[16px]" src={props?.banner} />
          </div>
          <div className="description-section flex flex-col justify-center align-middle">
            <p className="text-[32px] font-helvetica-neue font-bold">{props?.title}</p>
            <p className="text-[16px] text-slategray font-helvetica-neue font-thin">
              {props?.description.slice(0, 180) + (props?.description.length > 180 ? "..." : "")}
            </p>
          </div>
          <div className="description-section flex flex-col w-full">
            <div className="flex ">
              <img
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white mt-1"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <p className="text-[18px] items-center text-center font-semibold ml-2">Shardeum</p>
            </div>
            <div className="flex justify-evenly align-middle w-full"></div>
          </div>
          <div className="flex w-full justify-evenly align-middle ">
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
          <div className="">
            <GreenButton isHoveredReq={true} text={"Start Learning"} />
          </div>
  
        </div>
      </motion.div>
    </Link>
  );
};

export default CourseCard;
