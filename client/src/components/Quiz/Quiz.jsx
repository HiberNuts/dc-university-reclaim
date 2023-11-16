import React, { useState, useEffect } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import Button from './Button';
import AnswerList from './AnswerList';
import Question from './Question';
import ResultPage from './ResultPage';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

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
    if (choices.length === moduleQuiz.length) {
      checkAllAnswers();
      setIsSubmitted(true);
    } else {
      toast.custom((t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <p
                  className="h-10 w-10 rounded-full "
                  
                >😭</p>
              </div>
              <div className="ml-3 flex-1">
                <p className="font-satoshi text-md font-medium text-gray-900">
                  Please answer all questions before submitting.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="font-satoshi w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-shardeumBlue hover:text-shardeumOrange focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
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
    setChoices([]);
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
    <Toaster />
    
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
        
          <Button className="" onClickButton={handleSubmit}>
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
