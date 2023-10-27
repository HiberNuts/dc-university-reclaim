import React from "react";

export const OrangeButton = ({ title, style }) => {
  return (
    <button
      className={`bg-shardeumOrange hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out items-center font-semibold text-center text-white text-[22px] ${style}`}
    >
      {title}
    </button>
  );
};
