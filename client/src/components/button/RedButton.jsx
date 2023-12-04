import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RedButton = ({ title, style, icon, iconRight, onClick }) => {
  return (
    <button
      onClick={onClick ? onClick : null}
      className={`bg-shardeumRed hover:bg-[#ff4b0fd6] rounded-[10px] border-2 border-black  transition ease-in-out items-center  align-middle text-center text-white text-[22px] ${style}`}
    >
      {icon && <FontAwesomeIcon className="mr-3" icon={icon ? icon : ""} />}
      <span className="items-center font-helvetica-neue-md text-center ">{title}</span>
      {iconRight && <FontAwesomeIcon className="ml-3" icon={iconRight ? iconRight : ""} />}
    </button>
  );
};

export default RedButton;
