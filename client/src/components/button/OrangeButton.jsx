import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const OrangeButton = ({ title, style, icon, iconRight, onClick }) => {
  return (
    <button
      onClick={onClick ? onClick : null}
      className={`bg-shardeumOrange hover:bg-[#fc7d34] rounded-[10px]   transition ease-in-out items-center font-semibold align-middle text-center text-white text-[22px] ${style}`}
    >
      {icon && <FontAwesomeIcon className="mr-3" icon={icon ? icon : ""} />}
      <span className="items-center text-center ">{title}</span>
      {iconRight && <FontAwesomeIcon className="ml-3" icon={iconRight ? iconRight : ""} />}
    </button>
  );
};
