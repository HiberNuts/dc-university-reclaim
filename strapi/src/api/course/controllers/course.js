'use strict';

/**
 * course controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::course.course');


// api/Quiz/controllers/Quiz.js (or in your custom controller file)

module.exports = {
    async evaluateQuiz(ctx) {
      try {
        const { quizId, userAnswers } = ctx.request.body;
        const userId = ctx.state.user.id; 
  
        const quiz = await strapi.services.Quiz.findOne({ id: quizId });
  
        if (!quiz) {
          return ctx.badRequest('Quiz not found');
        }
  
        const quizQuestions = quiz.questions;
        const totalQuestions = quizQuestions.length;
  
        let correctCount = 0;
  
        for (let i = 0; i < totalQuestions; i++) {
          const userAnswer = userAnswers[i];
          const correctAnswer = quizQuestions[i].correctAnswer;
  
          if (userAnswer === correctAnswer) {
            correctCount++;
          }
        }
  
        const score = (correctCount / totalQuestions) * 100;
  

        const userProgress = await strapi.services.userProgress.findOne({
          user: userId,
          course: quiz.course,
        });
  
        if (!userProgress) {
          return ctx.badRequest('User progress not found');
        }
  
        const quizProgressKey = `quizProgress.${quizId}`;
  
        await strapi.services.userProgress.update(
          { id: userProgress.id },
          {
            [quizProgressKey]: {
              score: score,
              completed: true,  
            },
          }
        );
  
        return {
          score,
          message: 'Quiz evaluation successful',
        };
      } catch (error) {
        return ctx.badRequest('Quiz evaluation failed');
      }
    },  
  };
  