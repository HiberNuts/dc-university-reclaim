import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { OrangeButton } from "../button/OrangeButton";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import orangeShardeum from "../../assets/orangeShardeum.png";
import boat from "../../assets/boat.png";

import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import Acordian from "../Accordian/Acordian";

export default function Community() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const [isImageVisible, setImageVisible] = useState(false);
  const [animation, setAnimation] = useState(false);

  // setInterval(() => {
  //   setimageIndex(imageIndex + 1 == 4 ? 1 : imageIndex + 1);
  // }, 2500);

  const [imageUrl, setimageUrl] = useState(
    "https://img.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-72.jpg?size=626&ext=jpg&ga=GA1.1.1016455232.1698944705&semt=sph"
  );

  const [imageIndex, setimageIndex] = useState(1);

  const handleBlockClick = (index) => {
    setimageIndex(index);
  };

  const returnImageUrl = (index) => {
    console.log("return index", index);
    if (index === 1) {
      return "https://img.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-72.jpg?size=626&ext=jpg&ga=GA1.1.1016455232.1698944705&semt=sph";
    }
    if (index === 2) {
      return "https://img.freepik.com/free-vector/nature-scene-rural-land-agriculture-grassland-abtract-silhouette-asian-farmers-working-rice-field-illustration_1150-37317.jpg?size=626&ext=jpg&ga=GA1.1.1016455232.1698944705&semt=sph";
    }
    if (index === 3) {
      return "https://img.freepik.com/free-vector/landscape-man-canoe-river_24877-76260.jpg?size=626&ext=jpg&ga=GA1.1.1016455232.1698944705&semt=sph";
    }
    if (index === undefined) {
      return "https://img.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-72.jpg?size=626&ext=jpg&ga=GA1.1.1016455232.1698944705&semt=sph";
    }
  };

  const variants = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
    hide: {
      y: -20,
      opacity: 0,
    },
  };

  const [currentImage, setCurrentImage] = useState("default.jpg");

  const changeImage = (newImage) => {
    setCurrentImage(newImage);
  };

  useEffect(() => {
    setimageUrl(returnImageUrl(imageIndex));
  }, [imageIndex]);

  return (
    <div>
      <div className="heroSection md:flex  items-center flex flex-col w-full justify-center align-middle text-white bg-shardeumBlue">
        <motion.div
          ref={scrollRef}
          style={{ scaleX: scrollYProgress * 500 }}
          className="absolute hidden md:visible md:flex left-44 mt-32"
        ></motion.div>
        <div className="mt-[50px] subHeading sm:w-[80%] text-center  flex justify-center align-middle leading-[36px] items-center text-white md:text-[18px] sm:[18px] text-[18px]">
          <span className="text-white md:w-[50%] w-[70%] font-satoshi ">What makes us unique</span>
        </div>
        <div className="items-center  sm:w-[80%] text-white heroText lg:text-[48px] md:mt-10 md:text-[48px] sm:text-[36px] text-[36px]">
          <p className="text-center items-center flex justify-center align-middle">
            More than just a learning platform
          </p>
        </div>
        <div className="subHeading sm:w-[80%] text-center  flex justify-center align-middle leading-[36px] items-center text-white md:text-[18px] sm:[18px] text-[18px]">
          <span className="text-white md:w-[50%] w-[70%] font-satoshi ">
            Connect with like-minded developers on our social platforms. Dive into discussions, share insights, and
            explore the world of Web3 together. Let's learn, create, and evolve together!
          </span>
        </div>

        <div className="w-full flex flex-wrap justify-evenly align-middle items-center">
          <div className="learn-div flex flex-col   flex-wrap  justify-between  mt-6 gap-10">
            <div className="relative cursor-pointer">
              <div
                className={`flex ${
                  imageIndex === 1 ? "bg-shardeumOrange text-white" : "bg-white "
                } flex-col active:bg-shardeumPurple hover:bg-shardeumPurple  hover:text-black transition-all ease-linear duration-100 w-[600px] items-start gap-[16px] px-[24px] py-[20px] relative text-black rounded-[16px] overflow-hidden`}
                onClick={() => handleBlockClick(1)}
              >
                <div className="flex items-center gap-[32px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-bold  text-[20px]  leading-[30px] ">
                    Find your path
                  </div>
                </div>
                <p>
                  Web3 is a vast and complex ecosystem. Choose from hundreds of materials to find the path that&#39;s
                  right for you.
                </p>
              </div>
            </div>
            <div className="relative cursor-pointer">
              <div
                className={`flex ${
                  imageIndex === 2 ? "bg-shardeumOrange text-white" : "bg-white "
                } flex-col active:bg-shardeumPurple hover:bg-shardeumPurple  hover:text-black transition-all ease-linear duration-100 w-[600px] items-start gap-[16px] px-[24px] py-[20px] relative text-black rounded-[16px] overflow-hidden`}
                onClick={() => handleBlockClick(2)}
              >
                <div className="flex items-center gap-[32px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-bold  text-[20px]  leading-[30px] ">
                    World-class web3 instructors
                  </div>
                </div>
                <p>
                  Web3 is a vast and complex ecosystem. Choose from hundreds of materials to find the path that&#39;s
                  right for you.
                </p>
              </div>
            </div>
            <div className="relative cursor-pointer">
              <div
                className={`flex ${
                  imageIndex === 3 ? "bg-shardeumOrange text-white" : "bg-white "
                } flex-col active:bg-shardeumPurple hover:bg-shardeumPurple  hover:text-black transition-all ease-linear duration-100 w-[600px] items-start gap-[16px] px-[24px] py-[20px] relative text-black rounded-[16px] overflow-hidden`}
                onClick={() => handleBlockClick(3)}
              >
                <div className="flex items-center gap-[32px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-bold  text-[20px]  leading-[30px] ">
                    Learn and Earn
                  </div>
                </div>
                <p>
                  Web3 is a vast and complex ecosystem. Choose from hundreds of materials to find the path that&#39;s
                  right for you.
                </p>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-[600px] h-[518px]  rounded-[16px] mt-8"
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
              src={imageUrl}
              alt="Description of the image"
              className="object-fill w-full h-full rounded-[16px]"
            />
          </motion.div>
        </div>
      </div>

      <div className=" heroSection md:flex  items-center flex flex-col w-full justify-center align-middle text-white bg-shardeumBlue">
        <motion.div
          ref={scrollRef}
          style={{ scaleX: scrollYProgress * 500 }}
          className="absolute hidden md:visible md:flex left-44 mt-32"
        >
          <img src={orangeShardeum} />
        </motion.div>
        <div className="items-center  sm:w-[80%] text-white heroText lg:text-[48px] md:mt-10 md:text-[48px] sm:text-[36px] text-[36px]">
          <p className="text-center items-center flex justify-center align-middle">
            Be a part of an Active Community 🌟
          </p>
        </div>
        <div className="subHeading sm:w-[80%] text-center  flex justify-center align-middle leading-[36px] items-center text-white md:text-[18px] sm:[18px] text-[18px]">
          <span className="text-white md:w-[50%] w-[70%] font-satoshi ">
            Connect with like-minded developers on our social platforms. Dive into discussions, share insights, and
            explore the world of Web3 together. Let's learn, create, and evolve together!
          </span>
        </div>
        <div className="sm:w-[80%] my-[40px]  md:flex-row flex-col flex   justify-center items-center md:gap-5 gap-y-5 md:justify-evenly align-middle">
          <OrangeButton
            icon={faDiscord}
            title={"Join Our Discord"}
            style={"lg:w-[250px] md:w-[250px] text-[18px] w-[80%] py-2 md:py-0  lg:h-[50px] hover:scale-105"}
          />
          <OrangeButton
            icon={faX}
            title={"Join Our Twitter"}
            style={"lg:w-[250px] md:w-[250px] text-[18px] w-[80%] py-2 md:py-0  lg:h-[50px] hover:scale-105"}
          />
          <OrangeButton
            icon={faGithub}
            title={"Join Our GitHub"}
            style={"lg:w-[250px] md:w-[250px] text-[18px] w-[80%] py-2 md:py-0  lg:h-[50px] hover:scale-105"}
          />
        </div>
        <img className="absolute hidden md:visible md:flex right-44 mb-32 rotate-45" src={orangeShardeum} />
      </div>
    </div>
  );
}
