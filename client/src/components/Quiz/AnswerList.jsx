import React from "react";
import Answer from "./Answer";
import { v4 as uuidv4 } from "uuid";

const AnswerList = ({ answers, choice, onSelectAnswer, correctAnswer, currentQuizCompleted }) => {
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
            isCorrect={correctAnswer === ans}
          />
        ))}
    </div>
  );
};

export default AnswerList;
