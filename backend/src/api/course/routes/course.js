// @ts-nocheck
'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::course-progress.course-progress', {
    "method": "GET",
    "path": "/quiz/example",
    "handler": "quiz.exampleAction",
    "config": {
      "policies": []
    }
  }
);

