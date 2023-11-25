import React, { Suspense, lazy } from "react";
import "./Home.css";
import heroLogo from "../../assets/heroLogo.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GreenButton from "../button/GreenButton";

const Hero = () => {
  return (
    <div className=" heroSection md:flex md:h-[88vh] h-[100vh] z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue sm:rounded-b-[100px]">
      <Suspense
        fallback={
          <div className="heroSection md:flex md:h-[88vh] h-[100vh] z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue sm:rounded-b-[100px]"></div>
        }
      >
        <div className="relative heroSection  md:flex min-h-full  z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue sm:rounded-b-[100px]">
          <div className="items-center text-white heroText">
            <p className="text-center lg:text-[120px] md:text-[90px] sm:text-[80px] font-helvetica-neue text-[60px] items-center ">
              Become a{" "}
              <span className=" lg:text-[120px] md:text-[90px] sm:text-[60px] font-helvetica-neue text-[60px] text-shardeumGreen">
                Next-Gen{" "}
              </span>{" "}
              <br />
              Web 3.0 Developer
            </p>
            {/* <p className="text-center items-center flex justify-center align-middle"></p> */}
          </div>
          <div className="subHeading text-center w-full flex justify-center align-middle leading-[36px] items-center text-white md:text-[24px] sm:[24px] text-[20px]">
            <span className="text-white  text-[24px] md:w-[70%] w-[90%] font-helvetica ">
              Ensure rapid development and build powerful Linearly Scalable Dapps with Shardeum
            </span>
          </div>
          <motion.div className="w-full flex justify-center align-middle">
            <Link to="/courses">
              <GreenButton text={"Explore Courses"} />
              {/* <OrangeButton title={"Explore Courses"} style={"w-[250px] h-[50px] hover:scale-110"} /> */}
            </Link>
          </motion.div>
          <div className="w-full flex flex-col items-center justify-center align-middle">
            <div className="bg-shardeumWhite sm:px-[200px] sm:pt-[100px] sm:w-auto w-full pt-[100px] items-center flex justify-center align-middle rounded-t-full">
              <img className="w-[220px] heroLogo h-[200px]  items-center text-center" src={heroLogo} />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Hero;
