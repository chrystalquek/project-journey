import { body, param } from 'express-validator';
import { AnswerData, QuestionsOptionsRequestData } from '../types';

type FormValidatorMethod = 'createForm' | 'getFormDetails' | 'answerForm'

const questionValidator = (questions: Array<QuestionsOptionsRequestData>) => {
  // eslint-disable-next-line no-restricted-syntax
  questions.forEach((question) => {
    if (
      question.isRequired === undefined
        || question.displayText?.length === 0
        || question.type?.length === 0
    ) {
      throw new Error('Question Options data is not as expected');
    }
  });
  return true;
};

const answersValidator = (answers: Array<AnswerData>) => {
  answers.forEach((answer) => {
    if (!answer.questionId || !answer.content || !answer.userId) {
      throw new Error('Answers form data is not as expected');
    }
  });

  return true;
};

const getValidations = (method: FormValidatorMethod) => {
  switch (method) {
    case 'createForm': {
      return [
        body('eventId', 'Event ID was not provided').isString(),
        body('questions', 'questions parameter not provided').isArray(),
        body('questions', 'questions parameter format is incorrect').custom(
          (questions: QuestionsOptionsRequestData[]) => questionValidator(questions),
        ),
      ];
    }
    case 'getFormDetails': {
      return [
        param('eventId').isString(),
      ];
    }
    case 'answerForm': {
      return [
        body('eventId', 'eventId was not provided').isString(),
        body('answers', 'answers parameter format is incorrect').custom(
          (answers: Array<AnswerData>) => answersValidator(answers),
        ),
      ];
    }
    default: {
      return [];
    }
  }
};

export default getValidations;
