import React, { useState, useEffect } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import Button from './Button';
import AnswerList from './AnswerList';
import Question from './Question';
import ResultPage from './ResultPage';
import axios from 'axios';

const Quiz = ({ moduleQuiz, isModuleChanged }) => {
  const [quizNo, setQuizNo] = useState(0);
  const [choice, setChoice] = useState('');
  const [score, setScore] = useState(0);
  const [isloading, setIsloading] = useState(false);

  const [answerArray, setAnswerArray] = useState([]);
  const [currentQuiz, setcurrentQuiz] = useState({});
  const [correctAnswer, setcorrectAnswer] = useState('');
  const [choices, setChoices] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function extractABCDValues(quizArray, quizNo) {
    if (quizArray) {
      const selectedQuiz = quizArray[quizNo];

      if (selectedQuiz) {
        const { a, b, c, d } = selectedQuiz;
        setAnswerArray([a, b, c, d]);
      }
    }
  }

  const handleSelectAnswer = (answer, questionIndex) => {
    const updatedChoices = [...choices];
    updatedChoices[questionIndex] = answer;
    setChoices(updatedChoices);
  };

  const handleSubmit = () => {
    checkAllAnswers();
    setIsSubmitted(true);
  };
  
  const checkAllAnswers = () => {
    let newScore = 0;
    choices.forEach((choice, index) => {
      if (moduleQuiz[index]?.answer === INT_TO_ABC_MAP[choice]) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  function extractAnswersForQuestion(question) {
    return question ? [question.a, question.b, question.c, question.d] : [];
  }

  const INT_TO_ABC_MAP = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
  };

  const getQuiz = async () => {
    extractABCDValues(moduleQuiz, quizNo);
    setcurrentQuiz(moduleQuiz[quizNo] ? moduleQuiz[quizNo] : {});
    setcorrectAnswer(currentQuiz?.answer);
  };



  const handleClickNext = () => {
    checkAnswer();
    setQuizNo(quizNo + 1);
    setAnswerArray([]);
    extractABCDValues(moduleQuiz, quizNo);
  };

  const handleClickTry = () => {
    setScore(0);
    setChoice('');
    setQuizNo(0);
    setIsSubmitted(false);
  };

  useEffect(() => {
    setIsloading(true);
    getQuiz();
    extractABCDValues(moduleQuiz, quizNo);
    setIsloading(false);
  }, [isModuleChanged, moduleQuiz, quizNo]);

  useEffect(() => {
    extractABCDValues(moduleQuiz, quizNo);
    setcurrentQuiz(moduleQuiz[quizNo] ? moduleQuiz[quizNo] : {});
    setcorrectAnswer(moduleQuiz[quizNo]?.answer);
  }, [quizNo, isModuleChanged, moduleQuiz]);

  const incorrectAnswers = answerArray;
  const answers = incorrectAnswers;

  const isCorrect = correctAnswer === INT_TO_ABC_MAP[choice];

  console.log(currentQuiz);
  console.log(answerArray);
  console.log(choice);

  const checkAnswer = () => isCorrect && setScore(score + 1);
  //   console.log(answerArray);
  return (
    
    <div className=" w-full ">
    {console.log(moduleQuiz)}
      {moduleQuiz?.length === 0 || isloading ? (
        <p>Loading</p>
      ) : (
        <>
          
        {moduleQuiz.slice(0, moduleQuiz?.length).map((question, index) => (
          <div key={index}>
            <span className='text-[18px] text-shardeumBlue font-satoshi font-[700]'>
              Question {index + 1}
            </span>
            <Question currentQuiz={question} />
            <AnswerList
              answers={extractAnswersForQuestion(question)}
              choice={choices[index]}
              onSelectAnswer={(answer) => handleSelectAnswer(answer, index)}
              correctAnswer={isSubmitted ? question.answer : null}
            />
          </div>
        ))}
        
          <Button className="text-black" onClickButton={handleSubmit}>
            Submit
          </Button>
  
        </>
      )}

      {isSubmitted && (
      <ResultPage
        score={score}
        quizzes={moduleQuiz}
        onClickTry={handleClickTry}
      />
    )}
    </div>
  );
};

export default Quiz;
