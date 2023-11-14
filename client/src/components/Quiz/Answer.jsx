import React from "react";

const Answer = ({ choice, text, onSelectAnswer, index, isCorrect }) => {
    const answerStyle = {
        label: `font-satoshi py-[20px] px-[24px] flex items-center cursor-pointer rounded-[16px] border ${
            choice === index ? "bg-shardeumBlue text-white mb-3" : "border-black border-opacity-20 mb-3 hover:bg-slate-200 hover:text-black"
        }`,
        text: "font-satoshi ps-3 text-lg font-normal",
        customRadio: `h-[24px] w-[24px] p-[15px] rounded-full flex items-center justify-center text-black ${
            choice === index ? "bg-transparent text-white" : "bg-transparent"
        } border border-shardeumOrange mr-2 hover:bg-shardeumBlue`,
		correct: isCorrect ? "text-red border-2 border-green-500" : "",
    };

    const INT_TO_ABC_MAP = {
        0: "a",
        1: "b",
        2: "c",
        3: "d",
    };

    return (
        <div className="w-[100%]">
            <label className={answerStyle.label}>
                <div className={answerStyle.customRadio}>
                    {INT_TO_ABC_MAP[index].toUpperCase()}
                </div>
                <input
                    type="radio"
                    name="answer"
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