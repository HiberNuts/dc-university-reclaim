import type { Schema, Attribute } from '@strapi/strapi';

export interface CourseContentCourseContent extends Schema.Component {
  collectionName: 'components_course_content_course_contents';
  info: {
    displayName: 'courseContent';
    icon: 'medium';
    description: '';
  };
  attributes: {
    textEditor: Attribute.Component<'text-editor.text-editor'>;
    quiz: Attribute.Component<'quiz.quiz'>;
  };
}

export interface CourseProgressCourseProgress extends Schema.Component {
  collectionName: 'components_course_progress_course_progresses';
  info: {
    displayName: 'courseProgress';
    description: '';
  };
  attributes: {
    courseId: Attribute.String;
    quizProgress: Attribute.JSON;
  };
}

export interface QuizQuiz extends Schema.Component {
  collectionName: 'components_quiz_quizzes';
  info: {
    displayName: 'quiz';
    icon: 'question';
    description: '';
  };
  attributes: {
    quizTitle: Attribute.String;
    a: Attribute.String;
    b: Attribute.String;
    c: Attribute.String;
    d: Attribute.String;
    answer: Attribute.String;
  };
}

export interface TextEditorTextEditor extends Schema.Component {
  collectionName: 'components_text_editor_text_editors';
  info: {
    displayName: 'textEditor';
    icon: 'hashtag';
    description: '';
  };
  attributes: {
    editor: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
    title: Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'course-content.course-content': CourseContentCourseContent;
      'course-progress.course-progress': CourseProgressCourseProgress;
      'quiz.quiz': QuizQuiz;
      'text-editor.text-editor': TextEditorTextEditor;
    }
  }
}
