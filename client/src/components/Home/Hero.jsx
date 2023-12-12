import React, { Suspense } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GreenButton from "../button/GreenButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Hero = () => {
  return (
    <div className=" heroSection  md:flex  z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue sm:rounded-b-[100px]">
      <Suspense
        fallback={
          <div className="heroSection md:flex md:h-[88vh] h-[100vh] z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue sm:rounded-b-[100px]"></div>
        }
      >
        <div className="relative sm:mt-[40px] heroSection  md:flex min-h-full  z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue sm:rounded-b-[100px]">
          <div className="items-center px-4 md:px-0 font-extrabold flex justify-center align-middle w-full text-white heroText">
            <p className="text-center leading-[80px] lg:leading-[120px]  lg:text-[120px] md:text-[80px] sm:text-[60px] text-[60px] font-helvetica-neue-bold items-center ">
              Your One-Stop
              <span className="ml-3 font-helvetica-neue-bold mr-3  text-center  lg:text-[120px] md:text-[80px] sm:text-[60px] font-helvetica-neue items-center  text-shardeumGreen">
                Gateway
              </span>
              <br />
              to master Web3
            </p>
            {/* <p className="text-center items-center flex justify-center align-middle"></p> */}
          </div>
          <div className="subHeading mt-6 text-center w-full flex justify-center align-middle leading-[36px] items-center text-white md:text-[24px] sm:[24px] text-[20px]">
            <span className="text-white  text-[24px] md:w-[70%] w-[90%] font-helvetica-neue-roman ">
              Stay ahead in the future of the internet with Shardeum University
            </span>
          </div>
          <motion.div className="w-full flex justify-center align-middle my-[40px]">
            <Link to="/courses">
              <GreenButton boxShadow={true} isHoveredReq={true} text={"Explore Courses"} />
            </Link>
          </motion.div>
          <div className="w-full mt-2  flex flex-col items-center justify-center align-middle">
            <div className="bg-shardeumWhite sm:px-[200px] sm:pt-[100px] sm:w-auto w-full pt-[100px] items-center flex justify-center align-middle rounded-t-full">
              <LazyLoadImage
                className="w-[240px] heroLogo h-[220px] items-center text-center"
                alt=""
                height="220px"
                src={
                  "https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/d3cb5a74a108bb525a92133954dd3221.png"
                } // use normal <img> attributes as props
                width="240px"
              />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Hero;
