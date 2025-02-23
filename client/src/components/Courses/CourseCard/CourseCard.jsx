import React, { useRef } from "react";
import "./CourseCard.css";
import timeIcon from "../../../assets/timeIcon.svg";
import profileIcon from "../../../assets/profileIcon.svg";
import levelIcon from "../../../assets/levelIcon.svg";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import GreenButton from "../../button/GreenButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
        className="col-span-1 mx-auto flex card-container  h-[580px] bg-white border-[2px] shadow flex-col justify-center align-center w-[370px] sm:w-[400px] rounded-[16px]"
      >
        <div className="image-section h-full flex gap-4 flex-col justify-between  p-[20px]">
          <div className="flex justify-center   h-[192px] align-middle items-center">
            <LazyLoadImage
              className="w-[360px] h-[192px] rounded-[16px]"
              alt=""
              height="192px"
              src={props?.banner}
              width="360px"
            />
            {/* <img className="w-[360px] h-[192px] rounded-[16px]" src={props?.banner} /> */}
          </div>
          <div className="flex flex-col w-full h-full justify-between">
            <div className="description-section  flex flex-col justify-between align-middle">
              <div className="title-container">
                <p className="text-[32px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold font-bold">
                  {props?.title}
                </p>
              </div>
              <p className="text-[16px] mt-2 text-slategray font-helvetica-neue-roman leading-[25px]">
                {props?.description.slice(0, 140) + (props?.description.length > 180 ? "..." : "")}
              </p>
            </div>

            <div className="flex w-full   justify-between align-middle ">
              <div className="flex gap-2 h-full">
                <img className="w-5  flex h-full flex-col justify-center" src={timeIcon} />
                <span className="font-helvetica-neue-roman flex h-full flex-col justify-center">
                  {props?.duration} hrs
                </span>
              </div>
              <p>|</p>
              <div className="flex gap-2">
                <img className="w-5  flex h-full flex-col justify-center " src={profileIcon} />
                <span className="font-helvetica-neue-roman  flex h-full flex-col justify-center">
                  {props?.__v} Students
                </span>
              </div>
              <p>|</p>
              <div className="flex gap-2">
                <img className="w-5  flex h-full flex-col justify-center" src={levelIcon} />
                <span className="font-helvetica-neue-roman flex h-full flex-col justify-center">{props?.level}</span>
              </div>
            </div>
            <div className="">
              <GreenButton boxShadow={false} isHoveredReq={false} text={"Start Learning"} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CourseCard;
