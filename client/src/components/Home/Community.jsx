import React from "react";
import "./Home.css";
import heroLogoBlack from "../../assets/heroLogoBlack.png";
import { OrangeButton } from "../button/OrangeButton";
import cube from "../../assets/cube.png";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import orangeShardeum from "../../assets/orangeShardeum.png";

export default function Community() {
  return (
    <div className=" heroSection md:flex  items-center flex flex-col w-full justify-center align-middle text-white bg-shardeumBlue">
      <img className="absolute hidden md:visible md:flex left-44 mt-32" src={orangeShardeum} />
      <div className="items-center  sm:w-[80%] text-white heroText lg:text-[48px] md:mt-10 md:text-[48px] sm:text-[36px] text-[36px]">
        <p className="text-center items-center flex justify-center align-middle">Be a part of an Active Community 🌟</p>
      </div>
      <div className="subHeading sm:w-[80%] text-center  flex justify-center align-middle leading-[36px] items-center text-white md:text-[18px] sm:[18px] text-[18px]">
        <span className="text-white md:w-[50%] w-[70%] font-satoshi ">
          Connect with like-minded developers on our social platforms. Dive into discussions, share insights, and
          explore the world of Web3 together. Let's learn, create, and evolve together!
        </span>
      </div>
      <div className="sm:w-[80%] my-[40px]  md:flex-row flex-col flex   justify-center items-center md:gap-5 gap-y-5 md:justify-evenly align-middle">
        <OrangeButton
          icon={faDiscord}
          title={"Join Our Dsicord"}
          style={"lg:w-[250px] md:w-[250px] text-[18px] w-[80%] py-2 md:py-0  lg:h-[50px] hover:scale-105"}
        />
        <OrangeButton
          icon={faX}
          title={"Join Our Twitter"}
          style={"lg:w-[250px] md:w-[250px] text-[18px] w-[80%] py-2 md:py-0  lg:h-[50px] hover:scale-105"}
        />
        <OrangeButton
          icon={faGithub}
          title={"Join Our GitHub"}
          style={"lg:w-[250px] md:w-[250px] text-[18px] w-[80%] py-2 md:py-0  lg:h-[50px] hover:scale-105"}
        />
      </div>
      <img className="absolute hidden md:visible md:flex right-44 mb-32 rotate-45" src={orangeShardeum} />
    </div>
  );
}
