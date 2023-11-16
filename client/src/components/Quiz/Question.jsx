import React from "react";


const Question = ({ currentQuiz }) => (
	<p className='text-[18px] font-satoshi font-[700] mt-1'>{currentQuiz?.quizTitle}</p>
);

export default Question;
