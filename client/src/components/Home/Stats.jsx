import React, { useRef } from "react";
import "./Home.css";

export default function Stats() {
  return (
    <div className="w-full my-[100px] font-helvetica-neue-bold  gap-5 flex flex-row flex-wrap justify-evenly align-middle">
      <div className="statsCard w-[360px] leading-tight md:w-[400px]">
        <span className="text-shardeumBlue text-[88px] font-bold font-helvetica-neue-bold">10+</span>
        <p className="text-[24px]  font-helvetica-neue-md">Courses</p>
      </div>
      <div className="statsCard w-[360px] leading-tight md:w-[400px]">
        <span className="text-shardeumBlue text-[88px] font-bold font-helvetica-neue-bold">3+</span>
        <p className="text-[24px]  font-helvetica-neue-md">Mentors</p>
      </div>
      <div className="statsCard w-[360px] leading-tight md:w-[400px]">
        <span className="text-shardeumBlue text-[88px] font-bold font-helvetica-neue-bold">10,000+</span>
        <p className="text-[24px]  font-helvetica-neue-md">Students</p>
      </div>
    </div>
  );
}
