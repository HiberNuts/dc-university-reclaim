import React from "react";
import "./Home.css";
import heroLogo from "../../assets/heroLogo.png";
import { OrangeButton } from "../button/OrangeButton";
import cube from "../../assets/cube.png";
export default function Hero() {
  return (
    <div className="relative md:flex h-[88vh] z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue rounded-b-[100px]">
      <div className="absolute w-52 h-[88vh] inset-y-0 left-10  flex align-middle flex-col justify-center">
        <p className="backText  h-full text-white items-center text-center z-50 ">SHARDEUM</p>
      </div>
      <div className="items-center text-white heroText md:text-[80px] mt-10 text-[60px] ">
        <p className="text-center items-center flex justify-center align-middle">
          <img className="mr-5" src={cube} /> Become a Next-Gen
        </p>
        <p className="text-center items-center flex justify-center align-middle">
          Web 3.0 Developer <img className="ml-5" src={cube} />
        </p>
      </div>
      <div className="subHeading text-center w-full flex justify-center align-middle leading-[36px] items-center text-white text-[24px]">
        <span className="text-white w-[50%]">
          Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum
        </span>
      </div>
      <div className="w-full flex justify-center align-middle">
        <OrangeButton title={"Explore Courses"} style={"w-[250px] h-[50px] hover:scale-110"} />
      </div>
      <div className="w-full flex flex-col items-center justify-center align-middle">
        <div className="bg-white px-[200px] pt-[100px] items-center flex justify-center align-middle rounded-t-full">
          <img className="w-[220px] h-[200px]  items-center text-center" src={heroLogo} />
        </div>
      </div>
      <div className="absolute w-52 h-[88vh] inset-y-0 right-0  flex align-middle flex-col justify-center">
        <p className="backText h-full text-white items-center text-center z-50 ">MUEDRAHS</p>
      </div>
    </div>
  );
}
