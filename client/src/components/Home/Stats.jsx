import React from "react";
import "./Home.css";

export default function Stats() {
  return (
    <div className="w-full my-[100px] font-helvetica-neue-bold  flex flex-row flex-wrap justify-evenly align-middle">
      <div className="statsCard flex flex-col sm:flex-row justify-evenly">
        <div className=" border-2  md:rounded-l-[16px] md:rounded-r-[0px] rounded-t-[16px] md:border-b-2 md:border-r-0 border-b-0 lg:px-[60px] lg:py-[30px] md:px-[40px] md:py-[10px] px-[80px] py-[10px] flex flex-col justify-center align-middle leading-tight ">
          <span className="text-shardeumBlue w-full flex items-center justify-center align-middle lg:text-[88px] md:text-[60px] text-[88px] font-bold font-helvetica-neue-bold">6+</span>
          <p className="text-[24px] flex items-center justify-center align-middle  font-helvetica-neue-md">Courses</p>
        </div>
        {/* <div className=" border-2 md:border-r-0 lg:px-[60px]  border-b-0 md:border-b-2 lg:py-[30px] md:px-[40px] md:py-[10px] px-[80px] py-[10px] flex flex-col justify-center align-middle leading-tight ">
          <span className="text-shardeumBlue w-full flex items-center justify-center align-middle lg:text-[88px] md:text-[60px] text-[88px] font-bold font-helvetica-neue-bold">20+</span>
          <p className="text-[24px] flex items-center justify-center align-middle  font-helvetica-neue-md">Course Catalog</p>
        </div> */}
        {/* <div className="  border-2 md:border-b-2 md:border-r-0 border-b-0  lg:px-[60px] lg:py-[30px] md:px-[40px] md:py-[10px] px-[80px] py-[10px] flex flex-col justify-center align-middle leading-tight ">
          <span className="text-shardeumBlue w-full flex items-center justify-center align-middle lg:text-[88px] md:text-[60px] text-[88px] font-bold font-helvetica-neue-bold">500+</span>
          <p className="text-[24px] flex items-center justify-center align-middle  font-helvetica-neue-md">NFT's</p>
        </div> */}
        <div className=" border-2 md:rounded-r-[16px] rounded-b-[16px] md:rounded-l-[0px]  lg:px-[60px] lg:py-[30px] md:px-[40px] md:py-[10px] px-[80px] py-[10px] flex flex-col justify-center align-middle leading-tight ">
          <span className="text-shardeumBlue w-full flex items-center justify-center align-middle lg:text-[88px] md:text-[60px] text-[88px] font-bold font-helvetica-neue-bold">20k+</span>
          <p className="text-[24px] flex items-center justify-center align-middle  font-helvetica-neue-md">Developers</p>
        </div>
      </div>

    </div>
  );
}
