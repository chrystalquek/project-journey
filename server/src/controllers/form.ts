/* eslint-disable no-await-in-loop */
import express from 'express';
import { body, param } from 'express-validator';

import HTTP_CODES from '../constants/httpCodes';
import formService from '../services/forms/form';
import optionsService from '../services/forms/option';
import questionService from '../services/forms/question';
import { CreateFormQuestionsRequest, QuestionsOptionsRequestData } from '../types';
import validation from '../helpers/validation';

export type FormValidatorMethod = 'createForm' | 'getFormDetails'

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
    default: {
      return [];
    }
  }
};

const createForm = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { questions, eventId } = req.body as CreateFormQuestionsRequest;

    // Generate form attached to event
    // TODO: Remove "name" & "description"
    const formId = await formService.createForm({
      name: 'Dummy',
      description: 'Dummy description',
      eventId,
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const question of questions) {
      // Fill up relevant questions
      const questionsData = questions.map((questionData) => ({
        formId,
        isRequired: questionData.isRequired,
        text: questionData.text,
        type: questionData.type,
      }));
      const questionId = await questionService.insertQuestions(questionsData);
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
  const form = await formService.getForm(eventId);
  const questions = await questionService.getQuestions(form._id);

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
};

export default {
  createForm,
  getEventFormDetails,
  getValidations,
};
