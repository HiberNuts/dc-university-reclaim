import React from "react";

const btnDefaultStyle =
  "bg-shardeumRed text-white px-[52px] py-[18px] hover:bg-shardeumGreen hover:text-black rounded-[10px] transition ease-in-out float-right flex items-center gap-2 active:bg-[#e5701e] active:scale-95 active:shadow-inner";

const Button = ({ children, customStyle, onClickButton, isSubmitted }) => (
  <button type="button" onClick={onClickButton} className={customStyle || btnDefaultStyle}>
    {children}
  </button>
);

export default Button;
