import React, { useLayoutEffect, useState, useRef } from "react";
import { OrangeButton } from "../../button/OrangeButton";
import image1 from "../../../assets/image1.png";
import timeIcon from "../../../assets/timeIcon.svg";
import profileIcon from "../../../assets/profileIcon.svg";
import levelIcon from "../../../assets/levelIcon.svg";
import check from "../../../assets/check1.png";
import top from "../../../assets/top.png";
import orangeShardeum from "../../../assets/orangeShardeum.png";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAngleDown, faAngleRight, faX } from "@fortawesome/free-solid-svg-icons";
import CourseHeader from "./CourseHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CourseAbout from "./CourseAbout";
import CourseSkills from "./CourseSkills";
import CourseLearn from "./CourseLearn";
import Acordian from "../../Accordian/Acordian";
import CourseFAQ from "./CourseFAQ";
import CourseCertificate from "./CourseCertificate";

const CourseDescription = () => {
  return (
    <div className="w-full justify-center items-center gap-[100px] align-middle flex flex-col">
      <CourseHeader />
      <CourseAbout />
      <CourseSkills />
      <CourseLearn />
      <CourseCertificate />
      <CourseFAQ />
    </div>
  );
};

export default CourseDescription;
