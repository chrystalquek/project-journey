/* eslint-disable no-await-in-loop */
import express from 'express';
import { body, param } from 'express-validator';

import HTTP_CODES from '../constants/httpCodes';
import formService from '../services/forms/form';
import optionsService from '../services/forms/option';
import questionService from '../services/forms/question';
import answerService from '../services/forms/answer';
import {
  AnswerData,
  AnswerFormQuestionsRequest,
  CreateFormQuestionsRequest,
  QuestionsOptionsRequestData,
} from '../types';
import validation from '../helpers/validation';

export type FormValidatorMethod = 'createForm' | 'getFormDetails' | 'answerForm'

const getValidations = (method: FormValidatorMethod) => {
  switch (method) {
    case 'createForm': {
      return [
        body('eventId', 'Event ID was not provided').isString(),
        body('questions', 'questions parameter not provided').isArray(),
        body('questions', 'questions parameter format is incorrect').custom((questions: QuestionsOptionsRequestData[]) => validation.questionValidator(questions)),
      ];
    }
    case 'getFormDetails': {
      return [
        param('eventId').isString(),
      ];
    }
    case 'answerForm': {
      return [
        body('formId', 'formId was not provided').isString(),
        body('answers', 'answers parameter format is incorrect').custom((answers: Array<AnswerData>) => validation.answersValidator(answers)),
      ];
    }
    default: {
      return [];
    }
  }
};

const createForm = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { questions, eventId } = req.body as CreateFormQuestionsRequest;

    // Generate form attached to event
    // TODO: Remove "name" & "description" at model
    const formId = await formService.createForm({
      name: '',
      description: '',
      eventId,
    });

    const questionsData = questions.map((questionData) => ({
      formId,
      isRequired: questionData.isRequired,
      text: questionData.text,
      type: questionData.type,
    }));
    const questionIds = await questionService.insertQuestions(questionsData);
    for (let i = 0; i < questionIds.length; i += 1) {
      const question = questions[i];
      const questionId = questionIds[i];

      const optionsData = question.options.map((option) => ({
        questionId,
        text: option.content,
      }));
      // Fill up options for the question
      await optionsService.createOptionsForQuestion(optionsData);
    }
    res.status(HTTP_CODES.OK).send();
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const getEventFormDetails = async (req: express.Request, res: express.Response) => {
  const { eventId } = req.params;

  try {
    const form = await formService.getForm(eventId);
    const questions = await questionService.getQuestions(form._id);

    // TODO: Replace <any> with custom Question Option type
    const questionsWithOptions: Array<any> = [];
    for (let i = 0; i < questions.length; i += 1) {
      const question = questions[i];
      const optionsForQuestion = await optionsService.getOptionsForQuestion(question.id);

      questionsWithOptions.push({
        ...question,
        options: optionsForQuestion,
      });
    }

    res.status(HTTP_CODES.OK).send(questionsWithOptions);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const answerFormQuestions = async (req: express.Request, res: express.Response) => {
  let {
    formId,
    answers,
  } = req.body as AnswerFormQuestionsRequest;

  answers = answers.map((answer) => ({
    ...answer,
    formId,
  }));

  try {
    await answerService.bulkInsertAnswers(answers);
    res.status(HTTP_CODES.OK).send();
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

export default {
  createForm,
  getEventFormDetails,
  getValidations,
  answerFormQuestions,
};
