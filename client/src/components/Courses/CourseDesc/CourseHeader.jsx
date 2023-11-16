import React from "react";
import image1 from "../../../assets/image1.png";
import timeIcon from "../../../assets/timeIcon.svg";
import profileIcon from "../../../assets/profileIcon.svg";
import levelIcon from "../../../assets/levelIcon.svg";
import top from "../../../assets/top.png";
import orangeShardeum from "../../../assets/orangeShardeum.png";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAngleRight, faX } from "@fortawesome/free-solid-svg-icons";
import { OrangeButton } from "../../button/OrangeButton";
import { Link, useNavigate } from "react-router-dom";

import { generateSlug } from "../../../utils/generateSlug";

const CourseHeader = ({ props }) => {
  const navigate = useNavigate();
  return (
    <div className="flex  mt-[66px] h-[90vh] lg:h-auto flex-wrap w-[80%] justify-between gap-8 align-middle">
      <div className="description-div lg:flex-1 flex-wrap flex flex-col justify-between">
        <div className="header-div">
          <div
            className=" text-blue  md:text-[80px]  text-[60px]"
            style={{
              lineHeight: "58px",
              fontFamily: "Satoshi Variable",
              fontSize: "64px",
              fontStyle: "normal",
              fontWeight: 700,
              background: "var(--Gradient-1, linear-gradient(118deg, #3A4CFF 32.82%, rgba(58, 76, 255, 0.69) 71.69%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <p className=" ">{props?.title}</p>
          </div>
          <p className="text-[18px] mt-6 font-[500]">{props?.description}</p>
        </div>
        <div className="author-div flex ">
          <div className="flex ">
            <img
              class="inline-block h-8 w-8 rounded-full ring-2 ring-white "
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <p className="text-[18px] items-center text-center font-semibold ml-2">Raghav Jindal</p>
          </div>
        </div>
        <div className="flex w-full ">
          <div className="flex gap-4">
            <div className="flex gap-2">
              <img className="w-5 h-5 mt-1" src={timeIcon} />
              <span>{props?.duration} Hrs</span>
            </div>
            <p>|</p>
            <div className="flex gap-2">
              <img className="w-5 h-5 mt-1" src={profileIcon} />
              <span>10 Students</span>
            </div>
            <p>|</p>
            <div className="flex gap-2">
              <img className="w-5 h-5 mt-1" src={levelIcon} />
              <span>{props?.level}</span>
            </div>
          </div>
        </div>

        <OrangeButton
          onClick={() => {
            navigate(`/workplace/${generateSlug(props?.title)}`);
          }}
          style={"w-52 h-12 "}
          title={"Start Course"}
          iconRight={faAngleRight}
        />
      </div>
      <div className="banner-div  lg:flex-1 flex justify-center align-middle">
        <div className="w-[100%] sm:h-[400px]  ">
          <img className="rounded-xl w-full h-full" src={props?.banner} />
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
