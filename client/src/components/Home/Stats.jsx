import React from "react";
import "./Home.css";
export default function Stats() {
  return (
    <div className="w-full mt-[70px] flex flex-col justify-center align-middle ">
      <button className="text-center hover:scale-110 transition-all">
        <span className="border bg-white text-black border-white rounded-[40px] py-[5px] px-[38px]">
          Connect Wallet
        </span>
      </button>
      <div className="flex justify-center align-middle ">
        <div className="border md:text-[48px] text-[24px]  stats mt-[70px] bg-white text-black border-white rounded-[40px] w-[98%] item flex justify-evenly align-middle">
          <span>10+ Courses</span>
          <span>3+ Mentors</span>
          <span>10k Students</span>
        </div>
      </div>
    </div>
  );
}
