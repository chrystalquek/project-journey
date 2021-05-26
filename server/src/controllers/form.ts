/* eslint-disable no-await-in-loop */
import express from 'express';
import mongoose from 'mongoose';
import { body, param } from 'express-validator';

import HTTP_CODES from '../constants/httpCodes';
import formService from '../services/forms/form';
import optionsService from '../services/forms/option';
import questionService from '../services/forms/question';
import answerService from '../services/forms/answer';

import validation from '../helpers/validation';
import { AnswerData } from '../models/Forms/Answer';
import { QuestionsOptionsRequestData, CreateFormQuestionsRequest, AnswerFormQuestionsRequest } from '../questionTypes';

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
        body('eventId', 'eventId was not provided').isString(),
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

    const formId = await formService.createForm({
      eventId: mongoose.Types.ObjectId(eventId),
    });

    const questionsData = questions.map((questionData) => ({
      formId: mongoose.Types.ObjectId(formId),
      isRequired: questionData.isRequired,
      displayText: questionData.displayText,
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
      const optionsForQuestion = await optionsService.getOptionsForQuestion(question._id);

      questionsWithOptions.push({
        ...question,
        displayText: [question.displayText],
        name: question._id,
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
    eventId,
    answers,
  } = req.body as AnswerFormQuestionsRequest;

  if (answers.some((answer) => answer.userId !== req.user._id)) {
    // trying to submit responses that are not your user id is not allowed
    res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
    return;
  }

  const form = await formService.getForm(eventId);

  const formId = form._id;

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
