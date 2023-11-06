import React, { useRef } from "react";
import "./CourseCard.css";
import timeIcon from "../../../assets/timeIcon.svg";
import profileIcon from "../../../assets/profileIcon.svg";
import levelIcon from "../../../assets/levelIcon.svg";
import { OrangeButton } from "../../button/OrangeButton";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { AbiEncodingArrayLengthMismatchError } from "viem";

const CourseCard = ({ props }) => {
  const scrollRef = useRef(null);
  console.log(props);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["0 3", "1 1"] });
  return (
    <motion.div
      ref={scrollRef}
      style={{
        scale: scrollYProgress,
        opacity: scrollYProgress,
        boxShadow: "0px 4px 20px 0px rgba(195, 200, 255, 0.30);",
      }}
      className="flex card-container  h-[550px] bg-white dark:border-2 dark:border-shardeumPurple flex-col justify-center align-middle w-[400px] rounded-[16px]"
    >
      <div className="image-section h-full flex flex-col justify-evenly  px-[20px]">
        <div className="flex justify-center align-middle items-center">
          <img className="w-[360px] h-[200px] rounded-[16px]" src={props?.attributes.banner.data[0].attributes.url} />
        </div>
        <div className="description-section flex flex-col justify-center align-middle">
          <p className="text-[22px] font-bold">{props?.attributes.title}</p>
          <p className="text-[1rem] ">{props?.attributes.description}</p>
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
        <div className="flex w-full justify-evenly align-middle">
          <div className="flex gap-2">
            <img className="w-5 h-5 mt-1" src={timeIcon} />
            <span>{props?.attributes.duration} hrs</span>
          </div>
          <p>|</p>
          <div className="flex gap-2">
            <img className="w-5 h-5 mt-1" src={profileIcon} />
            <span>10 Students</span>
          </div>
          <p>|</p>
          <div className="flex gap-2">
            <img className="w-5 h-5 mt-1" src={levelIcon} />
            <span>{props?.attributes.level}</span>
          </div>
        </div>
        <Link to={`/course/${props?.attributes.title.split(" ").join("-")}`}>
          <OrangeButton title={"Start Learning"} style={"w-full h-[40px]"} />
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
