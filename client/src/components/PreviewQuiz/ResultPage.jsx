import React from "react";
import Button from "./Button";

const ResultPage = ({ score, quizzes, onClickTry, answerArray }) => (
  <div>
    {score === quizzes.length ? (
      ""
    ) : (
      <Button
        customStyle=" bg-shardeumRed px-[52px] py-[18px] hover:bg-shardeumGreen hover:text-black active:bg-[#e5701e] active:scale-95 active:shadow-inner rounded-[10px] transition ease-in-out text-white px-[30px] py-[10px] hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out flex "
        onClickButton={onClickTry}
      >
        Let's do it again
      </Button>
    )}
  </div>
);

export default ResultPage;
