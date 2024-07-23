import React, { useState } from "react";
import { ArrowIcon } from "../../assets/ArrowIcon";
import ShareIcon from "../../assets/shareIcon";

const ShareButton = ({ text, onClick, isHoveredReq, boxShadow }) => {
  const [isHovered, setisHovered] = useState(false);
  return (
    <button
      onClick={onClick ? onClick : null}
      style={{
        boxShadow: `${boxShadow? isHovered ? "" : "rgba(0, 0, 0, 0.15) 10px 10px 0px 0px":""}`,
        transition: "box-shadow 0.3s ease-in-out",
      }}
      onMouseOver={() => setisHovered(true)}
      onMouseOut={() => setisHovered(false)}
      className={`flex ${
        isHoveredReq && isHovered ? "" : "border-2 border-shardeumBlue"
      }   rounded-[16px] justify-evenly align-middle  `}
    >
      <span
        style={{ boxShadow: `${isHoveredReq && isHovered ? "rgba(0, 0, 0, 0.15) 10px 10px 0px 0px" : ""}` }}
        className={`text-[18px] transition-all ease-in-out  ${
          isHoveredReq && isHovered
            ? "rounded-r-[16px]  mr-3 border-2 transition-all ease-in-out border-shardeumBlue"
            : ""
        } rounded-l-[16px]  p-[12px] h-[54px]  bg-white tracking-wider flex  flex-col justify-center align-middle   items-center text-shardeumBlue font-helvetica-neue-md `}
      >
        {text}
      </span>
      <div
        style={{ boxShadow: `${isHoveredReq && isHovered ? "rgba(0, 0, 0, 0.15) 8px 8px 0px 0px" : ""}` }}
        className={`flex transition-all ease-in-out  flex-col  bg-white ${
          isHoveredReq && isHovered
            ? "rounded-full min-h-[54px] max-h-[66px] w-[66px] transition-all flex justify-center border-2 align-middle ease-in-out border-shardeumBlue items-center "
            : "rounded-r-[16px] min-h-[54px] max-h-[66px] transition-all ease-in-out pr-[12px]"
        } justify-center align-middle h-full items-center`}
      >
        <ShareIcon
          styles={`bg-shardeumGreen flex justify-center align-middle items-center ${
            isHoveredReq && isHovered
              ? "rounded-full p-1 items-center  items-center"
              : "rounded-[10px] w-[45px] h-[45px] "
          } `}
          width={"35"}
          height={"35"}
          color={"rgba(48, 66, 251, 1)"}
        />
      </div>
    </button>
  );
};

export default ShareButton;