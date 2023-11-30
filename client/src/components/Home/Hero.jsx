import React, { Suspense } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GreenButton from "../button/GreenButton";

const Hero = () => {
  return (
    <div className=" heroSection  md:flex  z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue sm:rounded-b-[100px]">
      <Suspense
        fallback={
          <div className="heroSection md:flex md:h-[88vh] h-[100vh] z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue sm:rounded-b-[100px]"></div>
        }
      >
        <div className="relative mt-[40px] heroSection  md:flex min-h-full  z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue sm:rounded-b-[100px]">
          <div className="items-center flex justify-center align-middle w-full text-white heroText">
            <p className="text-center md:w-[70%] w-[90%] lg:text-[80px] md:text-[50px] sm:text-[50px] text-[50px] font-helvetica-neue items-center ">
              Your One-Stop
              <span className="ml-3 mr-3 text-center md:w-[70%] w-[90%] lg:text-[80px] md:text-[50px] sm:text-[50px] font-helvetica-neue items-center  text-shardeumGreen">
                Gateway
              </span>
              to Becoming
              <span className="ml-3 mr-3 text-center md:w-[70%] w-[90%] lg:text-[80px] md:text-[50px] sm:text-[50px] font-helvetica-neue items-center  text-shardeumGreen">
                Top-Notch
              </span>
              Web3 Developer
            </p>
            {/* <p className="text-center items-center flex justify-center align-middle"></p> */}
          </div>
          <div className="subHeading mt-4 text-center w-full flex justify-center align-middle leading-[36px] items-center text-white md:text-[24px] sm:[24px] text-[20px]">
            <span className="text-white  text-[24px] md:w-[70%] w-[90%] font-helvetica ">
              Stay ahead in the future of the internet with best web3 content.
            </span>
          </div>
          <motion.div className="w-full flex justify-center align-middle my-[40px]">
            <Link to="/courses">
              <GreenButton isHoveredReq={true} text={"Explore Courses"} />
             
            </Link>
          </motion.div>
          <div className="w-full mt-2  flex flex-col items-center justify-center align-middle">
            <div className="bg-shardeumWhite sm:px-[200px] sm:pt-[100px] sm:w-auto w-full pt-[100px] items-center flex justify-center align-middle rounded-t-full">
              <img
                className="w-[240px] heroLogo h-[220px] items-center text-center"
                src={
                  "https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/d3cb5a74a108bb525a92133954dd3221.png"
                }
              />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Hero;
