import React, { useEffect, useState } from "react";
import "./Home.css";
// import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
const Unique = () => {

  const [imageUrl, setimageUrl] = useState(
    "https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/f0f7cd4635a169f02ca5bdc4b84578d9.jpg"
  );

  const [imageIndex, setimageIndex] = useState(1);

  const handleBlockClick = (index) => {
    setimageIndex(index);
  };

  const returnImageUrl = (index) => {
    if (index === 1) {
      return "https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/f0f7cd4635a169f02ca5bdc4b84578d9.jpg";
    }
    if (index === 2) {
      return "https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/4212f9a5ddc7682521fdb8b00ba6733b.jpg";
    }
    if (index === 3) {
      return "https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/fd68d63b08d7cbfe2e3ea7fcaee0e05f.jpg";
    }
    if (index === undefined) {
      return "https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/f0f7cd4635a169f02ca5bdc4b84578d9.jpg";
    }
  };

  const TickSvg = () => {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="tick">
          <rect x="1" y="1" width="32" height="32" rx="16" fill="#A4FF00" />
          <rect x="1" y="1" width="32" height="32" rx="16" stroke="black" stroke-width="2" />
          <path
            id="Vector"
            d="M23 13.3L14.75 21.7L11 17.8818"
            stroke="black"
            stroke-width="2.4"
            stroke-linecap="square"
          />
        </g>
      </svg>
    );
  };

  useEffect(() => {
    setimageUrl(returnImageUrl(imageIndex));
  }, [imageIndex]);
  return (
    <div className="px-[20px]  sm:px-[0px] md:flex font-helvetica-neue gap-8 items-center flex flex-col w-full sm:py-[60px] py-[40px] justify-center align-middle text-white bg-shardeumBlue">
      <div className="items-center  sm:w-[80%] text-white lg:text-[64px] md:mt-10 md:text-[64px] sm:text-[36px] text-[36px]">
        <p className="text-center items-center leading-none flex justify-center align-middle font-helvetica-neue-bold font-extrabold ">
          Become the Next Leading Web3 Developer
        </p>
      </div>
      <div className="subHeading sm:w-[80%] text-center  flex justify-center align-middle  items-center text-white md:text-[18px] sm:[18px] text-[18px]">
        <span className="text-white leading-relaxed font-helvetica-neue-md text-[18px]">
          Transform into a Web3 developer with Shardeum's real-world programs
        </span>
      </div>

      <div className="w-full flex flex-wrap justify-evenly align-middle items-center">
        <div className="learn-div flex flex-col   flex-wrap  justify-between  mt-6 gap-10">
          <div className="relative flex w-full justify-center align-middle  cursor-pointer">
            <div
              style={{ boxShadow: "8px 8px 0px 0px rgba(0, 0, 0, 0.15)" }}
              className={`flex  ${imageIndex === 1 ? "bg-shardeumPink text-black" : "bg-white border-2 border-black"
                } flex-col gap-4 active:bg-shardeumPurple hover:bg-shardeumPurple border-2 border-black hover:text-black transition-all ease-linear duration-100 items-start px-[24px] py-[20px] md:w-[600px] w-[90%] relative text-black rounded-[16px] overflow-hidden`}
              onClick={() => handleBlockClick(1)}
            >
              <div className="flex items-center gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
                <TickSvg />
                <div className="relative w-fit mt-[-1.00px] text-[28px]  leading-[30px] font-helvetica-neue-bold">
                  Choose Your Favorite Courses
                </div>
              </div>
              <p className="font-helvetica-neue-roman leading-normal text-[16px] font-extralight text-slate-700">
                Select from a diverse array of resources, that includes both beginner friendly and advanced materials,
                to carve out a path that truly resonates with your passion and ambitions.
              </p>
            </div>
          </div>
          <div className="relative flex w-full justify-center align-middle cursor-pointer">
            <div
              style={{ boxShadow: "8px 8px 0px 0px rgba(0, 0, 0, 0.15)" }}
              className={`flex ${imageIndex === 2 ? "bg-shardeumPink text-black" : "bg-white border-2 border-black"
                } flex-col gap-4 active:bg-shardeumPurple hover:bg-shardeumPurple border-2 border-black hover:text-black transition-all ease-linear duration-100 md:w-[600px] items-start  px-[24px] py-[20px] w-[90%] relative text-black rounded-[16px] overflow-hidden`}
              onClick={() => handleBlockClick(2)}
            >
              <div className="flex items-center gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
                <TickSvg />
                <div className="relative w-fit mt-[-1.00px] text-[28px]  leading-[30px] font-helvetica-neue-bold">
                  Engage & Innovate
                </div>
              </div>
              <p className="font-helvetica-neue-roman leading-normal text-[16px] font-extralight text-slate-700">
                Connect with a vibrant community of Web3 enthusiasts and experts. Participate in full stack courses and
                technical deep dives to apply your knowledge and innovate in the real world.
              </p>
            </div>
          </div>
          <div className="relative flex w-full justify-center align-middle cursor-pointer">
            <div
              style={{ boxShadow: "8px 8px 0px 0px rgba(0, 0, 0, 0.15)" }}
              className={`flex ${imageIndex === 3 ? "bg-shardeumPink text-black" : "bg-white border-2 border-black"
                } flex-col gap-4 active:bg-shardeumPurple border-2 border-black hover:bg-shardeumPurple  hover:text-black transition-all ease-linear duration-100 md:w-[600px] items-start  px-[24px] py-[20px] w-[90%] relative text-black rounded-[16px] overflow-hidden`}
              onClick={() => handleBlockClick(3)}
            >
              <div className="flex items-center gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
                <TickSvg />
                <div className="relative w-fit mt-[-1.00px] text-[28px]  leading-[30px] font-helvetica-neue-bold">
                  Mentorship & Guidance
                </div>
              </div>
              <p className="font-helvetica-neue-roman text-[16px] leading-normal font-extralight text-slate-700">
                Benefit from personalized guidance, industry wisdom, and support from seasoned experts across Shardeum
                and its partner projects to navigate the complexities of a dynamic blockchain ecosystem.
              </p>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative md:w-[600px] w-[90%] sm:h-full boder-2   rounded-[16px] mt-8"
          style={{ boxShadow: "8px 8px 0px 0px rgba(0, 0, 0, 0.15)" }}
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            src={imageUrl}
            alt="Description of the image"
            className="object-fill border-2 border-black w-full h-full rounded-[16px]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Unique;
