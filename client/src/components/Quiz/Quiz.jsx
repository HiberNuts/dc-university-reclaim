import React, { useState, useEffect } from "react";
import Button from "./Button";
import AnswerList from "./AnswerList";
import Question from "./Question";
import ResultPage from "./ResultPage";
// import SuccessModal from "./SuccessModal";
import toast, { Toaster } from "react-hot-toast";
import { updateCourseProgressAPI } from "../../utils/api/CourseAPI";
import LongArrow from "../../assets/LongArrow.svg";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
const Quiz = ({
  setCurrentChapter,
  setIsProgramSelected,
  moduleQuiz,
  currentModule,
  userCourseProgress,
  setuserCourseProgress,
  courseId,
  userId,
  accessToken,
  setisQuizSelected,
  setisModuleChanged,
  isModuleChanged,
  currentChapterStatus
}) => {
  const [quizNo, setQuizNo] = useState(0);
  // const [choice, setChoice] = useState("");
  const [score, setScore] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [answerArray, setAnswerArray] = useState([]);
  const [currentQuiz, setcurrentQuiz] = useState({});
  // const [correctAnswer, setcorrectAnswer] = useState("");
  const [choices, setChoices] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuizCompleted, setcurrentQuizCompleted] = useState(
    userCourseProgress?.modules[userCourseProgress.modules.findIndex((m) => m._id == currentModule._id)].quizStatus ==
      "full"
      ? true
      : false
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
    // setModalIsOpen(true);
    const updatedModules = userCourseProgress?.modules?.map((module) => {
      if (module?._id === currentModule?._id) {
        // Update quizStatus to true for the entire module
        module.quizStatus = "full";
        if (module.program === null) {
          module.status = "full";
        }
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
                <p className=" text-md text-black font-medium text-gray-900">
                  Please answer all questions before submitting.
                </p>
              </div>
            </div>
          </div>
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
    // setcorrectAnswer(currentQuiz?.answer);
  };

  const handleClickTry = () => {
    setScore(0);
    // setChoice("");
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
    // setcorrectAnswer(moduleQuiz[quizNo]?.answer);
  }, [quizNo, currentQuiz, moduleQuiz]);

  useEffect(() => {
    setChoices([]);
    setScore(0);
    // setIsSubmitted(false);
    setcurrentQuizCompleted(
      userCourseProgress?.modules[userCourseProgress.modules.findIndex((m) => m._id == currentModule._id)].quizStatus ==
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
  }, [moduleQuiz, isSubmitted == true]);

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
    <div className=" w-full gap-2 flex flex-col">
      <Toaster />
      {moduleQuiz?.length === 0 || isloading ? (
        <p>Loading</p>
      ) : (
        <div className="w-full bg-[#121212] p-2 md:p-6 border-[1px] border-[#79797B] rounded-lg">
          {moduleQuiz.slice(0, moduleQuiz?.length).map((question, index) => (
            <div key={index}>
              <span className="uppercase relative self-stretch  text-[14px] tracking-[0] leading-7 font-gilroy text-[#B7C2FD] ">Question {index + 1}</span>
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
            <div className="flex w-full px-2 mt-10 justify-end">
              <button onClick={handleSubmit}
                className={`bg-gradient-to-b from-[#3A59FE] to-decentraBlue rounded-[10px] h-[48px] flex justify-center  px-[32px] py-[22px]   items-center align-middlerelative self-stretch tracking-[0] leading-7 font-gilroybold  text-white text-sm`}
              >
                {score === moduleQuiz.length ? "Completed" : "Submit"}
              </button>
            </div>
          )}
        </div>
      )
      }

      {
        !currentQuizCompleted && isSubmitted && (
          <ResultPage score={score} quizzes={moduleQuiz} onClickTry={handleClickTry} answerArray={answerArray} />
        )
      }

      <div className=" bg-[#121212] p-2 md:p-6 border-[1px] border-[#79797B] rounded-lg w-full mt-10 flex justify-between align-middle items-center">
        <div className="flex flex-row gap-2">

          <button
            onClick={() => {
              setisQuizSelected(false)
              setIsProgramSelected(false)
              setCurrentChapter(currentModule.chapter[currentModule.chapter.length - 1])
              setisModuleChanged(!isModuleChanged);
            }}
            className={`bg-gradient-to-b from-[#3A59FE] to-decentraBlue h-[58px] w-[58px] flex justify-center align-middle  hover:bg-black rounded-[10px]  transition ease-in-out items-center font-semibold  text-center text-white text-[16px] `}

          >
            <IoMdArrowBack className="text-xl" />

          </button>
          <div className="flex flex-col">
            <p className="relative self-stretch font-gilroy text-[#3A59FE] text-[16px] tracking-[0] leading-[31.5px] text-wraps">Prev Topic</p>
          </div>
        </div>

        {
          currentModule.program && currentQuizCompleted &&
          <div className="flex flex-row gap-2">
            <div className="flex flex-col">
              <p className="relative self-stretch font-gilroy text-[#3A59FE] text-[16px] tracking-[0] leading-[31.5px] text-wraps">Next Topic</p>
            </div>
            <button
              onClick={() => {
                setisQuizSelected(false)
                setIsProgramSelected(true)

              }}
              className={`bg-gradient-to-b from-[#3A59FE] to-decentraBlue h-[58px] w-[58px] flex justify-center align-middle  hover:bg-black rounded-[10px]  transition ease-in-out items-center font-semibold  text-center text-white text-[16px] `}
            >
              <IoMdArrowForward className="text-xl" />
            </button>
          </div>
        }

      </div>
    </div >
  );
};

export default Quiz;
