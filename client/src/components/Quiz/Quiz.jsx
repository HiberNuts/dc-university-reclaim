import React, { useState, useEffect } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import Button from "./Button";
import AnswerList from "./AnswerList";
import Question from "./Question";
import ResultPage from "./ResultPage";
import axios from "axios";

const Quiz = ({ moduleQuiz, isModuleChanged }) => {
  const [quizNo, setQuizNo] = useState(0);
  const [choice, setChoice] = useState("");
  const [score, setScore] = useState(0);
  const [isloading, setIsloading] = useState(false);

  const [answerArray, setAnswerArray] = useState([]);
  const [currentQuiz, setcurrentQuiz] = useState({});
  const [correctAnswer, setcorrectAnswer] = useState("");

  function extractABCDValues(quizArray, quizNo) {
    if (quizArray) {
      const selectedQuiz = quizArray[quizNo];

      if (selectedQuiz) {
        const { a, b, c, d } = selectedQuiz;
        setAnswerArray([a, b, c, d]);
      }
    }
  }

  const INT_TO_ABC_MAP = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
  };

  const getQuiz = async () => {
    extractABCDValues(moduleQuiz, quizNo);
    setcurrentQuiz(moduleQuiz[quizNo] ? moduleQuiz[quizNo] : {});
    setcorrectAnswer(currentQuiz?.answer);
  };

  const handleSelectAnswer = (answer) => setChoice(answer);

  const handleClickNext = () => {
    checkAnswer();
    setQuizNo(quizNo + 1);
    setAnswerArray([]);
    extractABCDValues(moduleQuiz, quizNo);
  };

  const handleClickTry = () => {
    setScore(0);
    setChoice("");
    setQuizNo(0);
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
    <div className=" w-full md:max-w-lg ">
      {moduleQuiz?.length === 0 || isloading ? (
        <p>Loading</p>
      ) : quizNo == moduleQuiz?.length ? (
        <ResultPage score={score} quizzes={moduleQuiz} onClickTry={handleClickTry} />
      ) : (
        <div>
          <div className=" flex justify-between mb-3">
            <span>
              {quizNo + 1}/{moduleQuiz?.length}
            </span>
          </div>

          <Question currentQuiz={currentQuiz} />

          <AnswerList answers={answers} choice={choice} onSelectAnswer={handleSelectAnswer} />

          <Button onClickButton={handleClickNext}>
            Next
            <RiArrowRightLine />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
