import React from "react";
import Button from "./Button";

const ResultPage = ({ score, quizzes, onClickTry }) => (
	<div className="font-satoshi h-[500px] gap-2 flex flex-col justify-center items-center pb-8">
		
		<span className=" text-3xl">Congrats🎉</span>

		<h2 className=" font-bold text-shardeumBlue text-5xl">{score * (100 / quizzes.length)}% Score</h2>

		<span className="block text-lg font-light">Quiz completed successfully.</span>

		<Button
			customStyle=" bg-shardeumOrange mt-5 text-white px-[30px] py-[10px] hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out flex items-center gap-2 "
			onClickButton={onClickTry}
		>
			Let's do it again
		</Button>
	</div>
);

export default ResultPage;
