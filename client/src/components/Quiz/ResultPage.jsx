import React from "react";
import Button from "./Button";

const ResultPage = ({ score, quizzes, onClickTry, answerArray }) => (
	<div className="font-satoshi">
		
		{/* <span className=" text-3xl">Congrats🎉</span>

		<h2 className=" font-bold text-shardeumBlue text-5xl">{score * (100 / quizzes.length)}% Score</h2>

		<span className="block text-lg font-light">Quiz completed successfully.</span> */}


		{(score === answerArray.length) ? "" : <Button
			customStyle=" bg-shardeumOrange px-[52px] py-[22px] hover:bg-[#fc7d34] active:bg-[#e5701e] active:scale-95 active:shadow-inner rounded-[10px] transition ease-in-out text-white px-[30px] py-[10px] hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out flex "
			onClickButton={onClickTry}
		>
			Let's do it again
		</Button>}


	</div>
);

export default ResultPage;
