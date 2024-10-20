import React from "react";

const Question = ({ currentQuiz }) => <p className="text-[16px] my-2 relative self-stretch font-gilroy text-[#b1b0b9]  tracking-[0] leading-[31.5px] text-wrap">{currentQuiz?.quizTitle}</p>;

export default Question;
