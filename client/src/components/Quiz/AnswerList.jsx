import React from 'react';
import Answer from './Answer';
import { v4 as uuidv4 } from 'uuid';

const AnswerList = ({ answers, choice, onSelectAnswer, correctAnswer }) => {

  return (
    <div className="my-8">
      {answers &&
        answers.map((ans, index) => (
          
          <Answer
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
