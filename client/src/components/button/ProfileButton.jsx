import React, { useState } from "react";
import { PencilIcon } from "../../assets/PencillIcon";


const ProfileButton = ({ text, onClick, isHoveredReq }) => {
  const [isHovered, setisHovered] = useState(false);
  return (
    <button
    
      onClick={onClick ? onClick : null}
      style={{
        boxShadow: `${isHovered ? "" : "rgba(0, 0, 0, 0.15) 8px 8px 0px 0px"}`,
        transition: "box-shadow 0.3s ease-in-out",
      }}
      onMouseOver={() => setisHovered(true)}
      onMouseOut={() => setisHovered(false)}
      className={`flex ${
        isHoveredReq && isHovered ? "" : ""
      }   rounded-[12px]  justify-between`}
    >
      <span
        style={{ boxShadow: `${isHoveredReq && isHovered ? "rgba(0, 0, 0, 0.15) 10px 10px 0px 0px" : ""}` }}
        className={`text-[18px] transition-all ease-in-out  ${
          isHoveredReq && isHovered
            ? "rounded-r-[16px]  mr-3 border-2 transition-all ease-in-out border-shardeumBlue"
            : ""
        } rounded-l-[16px]  p-[12px] min-w-[160px]  h-[66px]  bg-white tracking-wider flex align-middle items-center  self-center  text-shardeumBlue text-[20px] font-helvetica-neue font-[600]`}
      >
        {text}
      </span>
      <div
        style={{ boxShadow: `${isHoveredReq && isHovered ? "rgba(0, 0, 0, 0.15) 8px 8px 0px 0px" : ""}` }}
        className={`flex transition-all ease-in-out  flex-col  bg-white ${
          isHoveredReq && isHovered
            ? "rounded-full min-h-[66px] max-h-[60px] w-[66px] transition-all flex justify-center align-middle ease-in-out items-center "
            : "rounded-r-[16px] min-h-[66px] max-h-[66px] transition-all ease-in-out pr-[12px]"
        } justify-center align-middle h-full items-center`}
      >
        <PencilIcon
          styles={`bg-shardeumGreen flex justify-center align-middle items-center p-[10px] ${
            isHoveredReq && isHovered
              ? "rounded-full p-1 items-center  border-2 border-shardeumBlue items-center"
              : "rounded-[10px] w-[40px] h-[40px] "
          } `}
          width={"35"}
          height={"35"}
          color={"rgba(48, 66, 251, 1)"}
        />
      </div>
    </button>
  );
};

export default ProfileButton;
