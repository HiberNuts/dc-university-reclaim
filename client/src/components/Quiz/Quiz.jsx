import React, { useState, useEffect } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import Button from './Button';
import AnswerList from './AnswerList';
import Question from './Question';
import ResultPage from './ResultPage';
import axios from 'axios';

const Quiz = () => {
//   const quizes = [
//     {
//       id: '0',
//       correctAnswer: 'Tennis',
//       a: 'a',
//       b: 'b',
//       c: 'c',
//       d: 'd',
//       incorrectAnswers: ['Tennis', 'Soccer', 'Badminton', 'Volleyball'],

//       question: 'Within Which Sport Might You Encounter The Cyclops System?',
//     },
//     {
//       id: '1',
//       correctAnswer: 'Tennis',
//       a: 'test',
//       b: 'test2',
//       c: 'test3',
//       d: 'test4',
//       incorrectAnswers: ['Tennis', 'Soccer', 'Badminton', 'Volleyball'],

//       question: 'Question 2',
//     },
//   ];

 
  const [quizNo, setQuizNo] = useState(0);
  const [choice, setChoice] = useState('');
  const [score, setScore] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [quizContent, setQuizContent] = useState([]);
  const [answerArray, setAnswerArray] = useState([]);

  function extractABCDValues(quizArray, quizNo) {
	// console.log("called extracted");
	// console.log(quizArray);
	if(quizArray){
		// console.log(quizArray);
		const selectedQuiz = quizArray[quizNo]
		//   console.log(selectedQuiz);
		  if (selectedQuiz) {
			const { a, b, c, d } = selectedQuiz;
			// console.log([a, b, c, d]);
			setAnswerArray([a, b, c, d]);
		  }
	}
    
  }

  const INT_TO_ABC_MAP={
	0:"a",
	1:"b",
	2:"c",
	3:"d",
  }

  const getQuiz = async () => {
    axios
      .get('http://localhost:1337/api/courses/1?populate=deep')
      .then((response) => {
        const content = response.data?.data?.attributes?.module?.[0]?.quizes;
        // console.log(content);
        if (content) {
			extractABCDValues(content, quizNo);
          setQuizContent(content);
        }
      })

      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSelectAnswer = (answer) => setChoice(answer);

  const handleClickNext = () => {
    checkAnswer();
    setQuizNo(quizNo + 1);
    setAnswerArray([]);
    extractABCDValues(quizContent, quizNo);
  };

  const handleClickTry = () => {
    setScore(0);
    setChoice('');
    setQuizNo(0);
  };

  //   useEffect(() => {

  //     fetchData(api_url).then((data) => {
  // 		console.log(data);
  //       setQuizzes(data);
  //       setIsloading(false);
  //     });
  //   }, []);

  useEffect(() => {
	setIsloading(true)
    getQuiz();
    extractABCDValues(quizContent, quizNo);
    setIsloading(false);
  }, []);

  useEffect(() => {
    extractABCDValues(quizContent, quizNo);
  }, [quizNo]);

  const currentQuiz = quizContent.length > 0 && quizContent[quizNo];
  const correctAnswer = currentQuiz?.answer;
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
      {quizContent.length === 0 || isloading ? (
        <p>Loading</p>
      ) : quizNo == quizContent.length ? (
        <ResultPage
          score={score}
          quizzes={quizContent}
          onClickTry={handleClickTry}
        />
      ) : (
        <div>
          <div className=" flex justify-between mb-3">
            <span>
              {quizNo + 1}/{quizContent.length}
            </span>
          </div>

          <Question currentQuiz={currentQuiz} />

          <AnswerList
            answers={answers}
            choice={choice}
            onSelectAnswer={handleSelectAnswer}
          />

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
