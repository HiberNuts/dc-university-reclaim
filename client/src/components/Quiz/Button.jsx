import React from "react";

const btnDefaultStyle =
	"bg-shardeumOrange text-white px-[52px] py-[22px] hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out float-right flex items-center gap-2 active:bg-[#e5701e] active:scale-95 active:shadow-inner";

const Button = ({ children, customStyle, onClickButton, isSubmitted }) => (
	<button
		type="button"
		className={customStyle || btnDefaultStyle}
		onClick={onClickButton}
	>
		{children}
	</button>
);

export default Button;
