import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useScroll } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Community() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const [isImageVisible, setImageVisible] = useState(false);
  const [animation, setAnimation] = useState(false);

  const [imageUrl, setimageUrl] = useState(
    "https://img.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-72.jpg?size=626&ext=jpg&ga=GA1.1.1016455232.1698944705&semt=sph"
  );

  const [imageIndex, setimageIndex] = useState(1);

  const handleBlockClick = (index) => {
    setimageIndex(index);
  };

  const returnImageUrl = (index) => {
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

  const LogoSvg = () => {
    return (
      <svg width="430" height="456" viewBox="0 0 430 456" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.3">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M29.1628 351.963L-29.4131 454.501H369.353L310.777 351.963H29.1628Z"
            stroke="black"
            stroke-width="2"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M111.416 3L-88 351.962H29.1804L169.992 105.542L111.416 3Z"
            stroke="black"
            stroke-width="2"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M228.591 3L170.016 105.542L310.823 351.962H428.007L228.591 3Z"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M169.974 206.161C205.005 206.161 233.401 234.853 233.401 270.249C233.401 305.645 205.005 334.337 169.974 334.337C134.943 334.337 106.547 305.645 106.547 270.249C106.547 234.853 134.943 206.161 169.974 206.161"
            stroke="black"
            stroke-width="2"
          />
        </g>
      </svg>
    );
  };

  return (
    <div className=" flex  my-[80px] items-center w-full justify-center align-middle text-black ">
      <div className="absolute left-0">
        <LogoSvg />
      </div>
      <div
        style={{ boxShadow: "8px 8px 0px 0px rgba(0, 0, 0, 0.15)" }}
        className="w-[80%] z-20 border-2 border-black flex flex-col justify-center  rounded-[16px] px-[20px]  sm:px-[100px] py-[50px] bg-shardeumTeelGreen"
      >
        <p className="text-center items-center flex justify-center align-middle text-[64px] font-[700] font-helvetica-neue">
          Be a part of an Active Community 🌟
        </p>
        <span className="w-full items-center font-light text-[18px] text-center font-helvetica-neue text-slate-700">
          Connect with like-minded developers on our social platforms. Dive into discussions, share insights, and
          explore the world of Web3 together. Let's learn, create, and evolve together!
        </span>

        <div className="flex flex-wrap mt-[32px] gap-8 justify-evenly align-middle">
          <Link to="https://discord.gg/shardeum" target="_blank">
            <div className="w-[260px] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none cursor-pointer hover:scale-110 transition-all ease-in-out 0.3s rounded-[12px] px-[32px] py-[14px] flex bg-white border-[3px] border-shardeumBlue align-middle justify-evenly">
              <FontAwesomeIcon
                className="flex flex-col justify-center  align-middle w-[30px] h-[30px]"
                color="#3A4CFF"
                icon={faDiscord}
              />
              <p className="text-[18px] font-bold text-shardeumBlue">Join Our Dsicord</p>
            </div>
          </Link>
          <Link to="https://twitter.com/shardeum" target="_blank">
            <div className="w-[260px] cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:scale-110 transition-all ease-in-out 0.3s rounded-[12px] px-[32px] py-[14px] flex bg-white border-[3px] border-shardeumBlue align-middle justify-evenly">
              <FontAwesomeIcon
                className="flex flex-col justify-center  align-middle w-[30px] h-[30px]"
                color="#3A4CFF"
                icon={faX}
              />
              <p className="text-[18px] font-bold text-shardeumBlue">Join Our Twitter</p>
            </div>
          </Link>
          <Link to="https://github.com/Shardeum" target="_blank">
            {" "}
            <div className="w-[260px] cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:scale-110 transition-all ease-in-out 0.3s rounded-[12px] px-[32px] py-[14px] flex bg-white border-[3px] border-shardeumBlue align-middle justify-evenly">
              <FontAwesomeIcon
                className="flex flex-col justify-center  align-middle w-[30px] h-[30px]"
                color="#3A4CFF"
                icon={faGithub}
              />
              <p className="text-[18px] font-bold text-shardeumBlue">Join Our GitHub</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
