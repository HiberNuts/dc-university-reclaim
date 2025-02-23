import type { Schema, Attribute } from '@strapi/strapi';

export interface ContestMetaTestCases extends Schema.Component {
  collectionName: 'components_contest_meta_test_cases';
  info: {
    displayName: 'test_cases';
    description: '';
  };
  attributes: {
    description: Attribute.Text;
    code: Attribute.Text;
  };
}

export interface ContestPrizePrize extends Schema.Component {
  collectionName: 'components_contest_prize_prizes';
  info: {
    displayName: 'prize';
  };
  attributes: {
    rank: Attribute.Integer;
    prize: Attribute.String;
  };
}

export interface CourseMetadataChapter extends Schema.Component {
  collectionName: 'components_course_metadata_chapters';
  info: {
    displayName: 'chapter';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

export interface CourseMetadataFaq extends Schema.Component {
  collectionName: 'components_course_metadata_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    faqTitle: Attribute.String;
    faqAnswer: Attribute.String;
  };
}

export interface CourseMetadataModule extends Schema.Component {
  collectionName: 'components_course_metadata_modules';
  info: {
    displayName: 'module';
    description: '';
  };
  attributes: {
    chapter: Attribute.Component<'course-metadata.chapter', true>;
    quizes: Attribute.Component<'course-metadata.quiz', true>;
    moduleTitle: Attribute.String;
    program: Attribute.Component<'program.program'>;
  };
}

export interface CourseMetadataQuiz extends Schema.Component {
  collectionName: 'components_course_metadata_quizzes';
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
    answer: Attribute.Enumeration<['a', 'b', 'c', 'd']>;
  };
}

export interface CourseMetadataWhatYouLlLearn extends Schema.Component {
  collectionName: 'components_course_metadata_what_you_ll_learns';
  info: {
    displayName: "what you'll learn";
    description: '';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface ProgramProgram extends Schema.Component {
  collectionName: 'components_program_programs';
  info: {
    displayName: 'program';
  };
  attributes: {
    description: Attribute.Blocks;
    boilerplate_code: Attribute.Text;
    solution: Attribute.Text;
    test_file_content: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'contest-meta.test-cases': ContestMetaTestCases;
      'contest-prize.prize': ContestPrizePrize;
      'course-metadata.chapter': CourseMetadataChapter;
      'course-metadata.faq': CourseMetadataFaq;
      'course-metadata.module': CourseMetadataModule;
      'course-metadata.quiz': CourseMetadataQuiz;
      'course-metadata.what-you-ll-learn': CourseMetadataWhatYouLlLearn;
      'program.program': ProgramProgram;
    }
  }
}
