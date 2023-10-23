import React from "react";
import "./Home.css";
import heroLogo from "../../assets/heroLogo.png";
export default function Hero() {
  return (
    <div className="md:flex h-[88vh] flex flex-col w-full justify-between align-middle text-black bg-white rounded-b-[250px]">
      <button className="text-center hover:scale-110 transition-all">
        <span className="border border-black rounded-[40px] py-[5px] px-[38px]">Explore Courses</span>
      </button>
      <div className="items-center heroText md:text-[96px] text-[60px]">
        <p>Become a next-gen</p>
        <p>Developer with Shardeum</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center align-middle">
        <div className="bg-shardeumBlue px-[250px] pt-[150px] items-center flex justify-center align-middle rounded-t-full">
          <img className="w-[220px] h-[200px]  items-center text-center" src={heroLogo} />
        </div>
      </div>
    </div>
  );
}
