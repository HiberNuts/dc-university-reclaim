import React from "react";
import Answer from "./Answer";
import { v4 as uuidv4 } from "uuid";

const AnswerList = ({ answers, choice, onSelectAnswer, correctAnswer, currentQuizCompleted, isSubmitted }) => {
  let correctAnswerIndex = -1;

  const ABC_TO_INT_MAP = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
  };

  if(correctAnswer != null){
    correctAnswerIndex = ABC_TO_INT_MAP[correctAnswer.toLowerCase()];
  }


  return (
    <div className="my-8">
      {answers &&
        answers.map((ans, index) => (
          <Answer
            currentQuizCompleted={currentQuizCompleted}
            index={index}
            key={uuidv4()}
            choice={choice}
            text={ans}
            onSelectAnswer={onSelectAnswer}
            isCorrect={answers[correctAnswerIndex] === ans}
            isSubmitted={isSubmitted}
          />
        ))}
    </div>
  );
};

export default AnswerList;
