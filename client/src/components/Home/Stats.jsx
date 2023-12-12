import React, { useRef } from "react";
import "./Home.css";

export default function Stats() {
  return (
    <div className="w-full my-[100px] font-helvetica-neue-bold  gap-5 flex flex-row flex-wrap justify-evenly align-middle">
      <div className="statsCard w-[350px] leading-tight md:w-[300px]">
        <span className="text-shardeumBlue text-[88px] font-bold font-helvetica-neue-bold">15+</span>
        <p className="text-[24px]  font-helvetica-neue-md">Courses</p>
      </div>
      <div className="statsCard w-[350px] leading-tight md:w-[300px]">
        <span className="text-shardeumBlue text-[88px] font-bold font-helvetica-neue-bold">20+</span>
        <p className="text-[24px]  font-helvetica-neue-md">Course Catalog</p>
      </div>
      <div className="statsCard w-[350px] leading-tight md:w-[300px]">
        <span className="text-shardeumBlue text-[88px] font-bold font-helvetica-neue-bold">500+</span>
        <p className="text-[24px]  font-helvetica-neue-md">NFT's</p>
      </div>
      <div className="statsCard w-[350px] leading-tight md:w-[300px]">
        <span className="text-shardeumBlue text-[88px] font-bold font-helvetica-neue-bold">500+</span>
        <p className="text-[24px] items-center text-center  font-helvetica-neue-md">Developers Ready to build</p>
      </div>
    </div>
  );
}
