import React from "react";

const Answer = ({ choice, text, onSelectAnswer, index, isCorrect, currentQuizCompleted, isSubmitted }) => {
  const answerStyle = {
    label: ` py-[20px] px-[24px] flex items-center cursor-pointer rounded-[16px] border ${
      choice === index
        ? isSubmitted
          ? "bg-shardeumBlue text-black mb-3"
          : "bg-shardeumBlue text-white mb-3"
        : "border-black border-opacity-20 mb-3 hover:bg-slate-200 hover:text-black transition ease-in-out"
    }`,
    text: " ps-3 text-lg font-normal",
    customRadio: `h-[24px] w-[24px] p-[15px] rounded-full flex items-center justify-center text-black ${
      choice === index
        ? isCorrect == true
          ? "bg-shardeumGreen text-black "
          : "bg-trasparent text-black"
        : "bg-transparent"
    } border  mr-2 `,
    correct: isSubmitted && isCorrect ? "bg-shardeumWhite text-black border-4 border-green-700" : "",
    incorrect: isSubmitted && !isCorrect ? "border-4 border-shardeumRed bg-shardeumWhite" : "",
    disable: isSubmitted ? "cursor-not-allowed" : "",
  };

  const INT_TO_ABC_MAP = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
  };

  return (
    <div className="w-[100%]">
      <label className={`${answerStyle.label} ${answerStyle.correct} ${answerStyle.incorrect} ${answerStyle.disable}`}>
        <div className={answerStyle.customRadio}>{INT_TO_ABC_MAP[index].toUpperCase()}</div>
        <input
          type="radio"
          name="answer"
          disabled={currentQuizCompleted || isSubmitted}
          checked={choice === index}
          onChange={() => onSelectAnswer(index)}
          className="hidden"
        />
        <span className={answerStyle.text}>{text}</span>
      </label>
    </div>
  );
};

export default Answer;
