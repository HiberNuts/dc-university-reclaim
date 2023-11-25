import React, { useRef } from "react";
import "./Home.css";

export default function Stats() {
  return (
    <div className="w-full my-[100px] font-helvetica-neue  gap-5 flex flex-row flex-wrap justify-evenly align-middle">
      <div className="statsCard w-[360px] md:w-[400px]">
        <span style={{ textShadow: "3px 0 #3a4cff" }} className="text-shardeumBlue text-[88px] font-bold">
          10+
        </span>
        <p className="text-[24px] font-bold">Courses</p>
      </div>
      <div className="statsCard w-[360px] md:w-[400px]">
        <span style={{ textShadow: "3px 0 #3a4cff" }} className="text-shardeumBlue text-[88px] font-bold">
          3+
        </span>
        <p className="text-[24px] font-bold">Mentors</p>
      </div>
      <div className="statsCard w-[360px] md:w-[400px]">
        <span style={{ textShadow: "3px 0 #3a4cff" }} className="text-shardeumBlue text-[88px] font-bold">
          10,000+
        </span>
        <p className="text-[24px] font-bold">Students</p>
      </div>
    </div>
  );
}
