import React, { useState, useEffect } from "react";
import Button from "./Button";
import AnswerList from "./AnswerList";
import Question from "./Question";
import ResultPage from "./ResultPage";
import SuccessModal from "./SuccessModal";
import toast, { Toaster } from "react-hot-toast";
import { updateCourseProgressAPI } from "../../utils/api/CourseAPI";

const PreviewQuiz = ({
  moduleQuiz,
  currentModule,
  userCourseProgress,
  setuserCourseProgress,
  courseId,
  userId,
  accessToken,
}) => {
  const [quizNo, setQuizNo] = useState(0);
  const [score, setScore] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [answerArray, setAnswerArray] = useState([]);
  const [currentQuiz, setcurrentQuiz] = useState({});
  const [choices, setChoices] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuizCompleted, setcurrentQuizCompleted] = useState(
    false
  );

  function extractABCDValues(quizArray, quizNo) {
    if (quizArray) {
      const selectedQuiz = quizArray[quizNo];

      if (selectedQuiz) {
        const { a, b, c, d } = selectedQuiz;
        setAnswerArray([a, b, c, d]);
      }
    }
  }

  const handleQuizUpdateToBackend = async () => {
    setModalIsOpen(true);
    const updatedModules = userCourseProgress?.modules?.map((module) => {
      if (module?.id === currentModule?.id) {
        // Update quizStatus to true for the entire module
        module.quizStatus = "full";
        module.status = "full";

        // Update all quiz statuses to 'full' for this module
        module.quizzes = module.quizzes.map((quiz) => ({
          ...quiz,
          status: "full",
        }));
      }
      return module;
    });

    const updatesUserPorgress = { ...userCourseProgress, modules: updatedModules };

    const updatedUserProgress = await updateCourseProgressAPI({
      updatesUserPorgress,
      courseId: courseId,
      userId: userId,
      accessToken: accessToken,
    });
    setuserCourseProgress(updatedUserProgress.updatedProgress);
    if (updatedUserProgress.updatedUserProgress) {
      setcurrentQuizCompleted(true);
    }
  };

  const handleSelectAnswer = (answer, questionIndex) => {
    const updatedChoices = [...choices];
    updatedChoices[questionIndex] = answer;
    setChoices(updatedChoices);
  };


  const handleSubmit = () => {
    if (choices.includes(undefined) == false && choices.length === moduleQuiz.length) {
      checkAllAnswers();
      setIsSubmitted(true);
    } else {
      toast.custom((t) => (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <p className="h-10 w-10 rounded-full ">😭</p>
              </div>
              <div className="ml-3 flex-1">
                <p className=" text-md font-medium text-gray-900">
                  Please answer all questions before submitting.
                </p>
              </div>
            </div>
          </div>s
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className=" w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-shardeumBlue hover:text-shardeumOrange focus:outline-none"
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
    // score * (100 / quizzes.length)
    if (newScore * (100 / moduleQuiz.length) == 100) {
      handleQuizUpdateToBackend();
    }
  };

  function extractAnswersForQuestion(question) {
    return question ? [question.a, question.b, question.c, question.d] : [];
  }

  const INT_TO_ABC_MAP = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
  };

  const ABC_TO_INT_MAP = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
  };

  const getQuiz = async () => {
    extractABCDValues(moduleQuiz, quizNo);
    setcurrentQuiz(moduleQuiz[quizNo] ? moduleQuiz[quizNo] : {});
  };
  const handleClickTry = () => {
    setScore(0);
    setQuizNo(0);
    setIsSubmitted(false);
    setChoices([]);

  };

  useEffect(() => {
    setIsloading(true);
    getQuiz();
    extractABCDValues(moduleQuiz, quizNo);
    setIsloading(false);
  }, [currentQuiz, moduleQuiz, quizNo]);

  useEffect(() => {
    extractABCDValues(moduleQuiz, quizNo);
    setcurrentQuiz(moduleQuiz[quizNo] ? moduleQuiz[quizNo] : {});
  }, [quizNo, currentQuiz, moduleQuiz]);

  useEffect(() => {
    setChoices([]);
    setScore(0);
    setIsSubmitted(false);
    setcurrentQuizCompleted(
      userCourseProgress?.modules[userCourseProgress.modules.findIndex((m) => m.id == currentModule.id)].quizStatus ==
        "full"
        ? true
        : false
    );
    if (currentQuizCompleted == true) {
      const finalAnswers = [];
      moduleQuiz.forEach((m) => {

        finalAnswers.push(ABC_TO_INT_MAP[m.answer]);
      });
      setChoices(finalAnswers);
    }
  }, [moduleQuiz]);

  useEffect(() => {
    if (currentQuizCompleted == true) {
      const finalAnswers = [];
      moduleQuiz.forEach((m) => {

        finalAnswers.push(ABC_TO_INT_MAP[m.answer]);
      });
      setChoices(finalAnswers);
    } else {
      setChoices([]);
    }
  }, [currentQuizCompleted]);


  return (
    <div className=" w-full font-helvetica-neue-roman">
      <Toaster />
      {moduleQuiz?.length === 0 || isloading ? (
        <p>Loading</p>
      ) : (
        <>
          {moduleQuiz.slice(0, moduleQuiz?.length).map((question, index) => (
            <div key={index}>
              <span className="text-[18px] font-helvetica-neue-roman text-shardeumBlue ">Question {index + 1}</span>
              <Question currentQuiz={question} />
              <AnswerList
                currentQuizCompleted={currentQuizCompleted}
                answers={extractAnswersForQuestion(question)}
                choice={choices[index]}
                onSelectAnswer={(answer) => handleSelectAnswer(answer, index)}
                correctAnswer={isSubmitted ? question.answer : null}
                isSubmitted={isSubmitted}
              />
            </div>
          ))}

          {!currentQuizCompleted && (
            <Button className="" onClickButton={handleSubmit}>
              {score === moduleQuiz.length ? "Completed" : "Submit"}
            </Button>
          )}
        </>
      )}

      {!currentQuizCompleted && isSubmitted && (
        <ResultPage score={score} quizzes={moduleQuiz} onClickTry={handleClickTry} answerArray={answerArray} />
      )}

      {<SuccessModal currentModule={currentModule} isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />}
    </div>
  );
};

export default PreviewQuiz;
