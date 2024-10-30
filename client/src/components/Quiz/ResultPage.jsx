import React from "react";
import Button from "./Button";

const ResultPage = ({ score, quizzes, onClickTry, answerArray }) => (
  <div>
    {score === quizzes.length ? (
      ""
    ) : (
      <button
        className={`bg-gradient-to-b from-[#3A59FE] to-decentraBlue rounded-[10px] h-[48px] flex justify-center  px-[32px] py-[22px]   items-center align-middlerelative self-stretch tracking-[0] leading-7 font-gilroybold  text-white text-sm`}

        onClick={onClickTry}
      >
        Let's do it again
      </button>
    )}
  </div>
);

export default ResultPage;
