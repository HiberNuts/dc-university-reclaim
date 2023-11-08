import React from "react";

const Answer = ({ choice, text, onSelectAnswer,index }) => {
	const answerStyle = {
		label: ` p-3 px-5 block cursor-pointer rounded-full border border-black  border-opacity-20  dark:border-primary dark:border-opacity-[0.5] mb-3  ${
			choice === text &&
			"bg-accent dark:bg-primary text-slate-100 border-transparent"
		} hover:bg-accent dark:hover:bg-primary dark:hover:text-accent hover:text-slate-100`,
		text: "ps-3 text-lg font-normal",
	};

	const INT_TO_ABC_MAP={
		0:"a",
		1:"b",
		2:"c",
		3:"d",
	  }
	

	return (
		<div>
			<label className={answerStyle.label}>
				<input
					type="radio"
					name="answer"
					checked={choice === index}
					onChange={() => {
						onSelectAnswer(index);
					}}
					// className=" absolute opacity-0"
					className=" accent-primary"
				/>
				<span className={answerStyle.text}>{text}</span>
			</label>
		</div>
	);
};

export default Answer;
