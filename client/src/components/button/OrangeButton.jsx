import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
export const OrangeButton = ({ title, style, icon }) => {
  return (
    <button
      className={`bg-shardeumOrange hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out items-center font-semibold text-center text-white text-[22px] ${style}`}
    >
      <FontAwesomeIcon icon={icon} /> {title}
    </button>
  );
};
