/* eslint-disable no-await-in-loop */
import express from 'express';

import HTTP_CODES from '../constants/httpCodes';
import formService from '../services/forms/form';
import optionsService from '../services/forms/option';
import questionService from '../services/forms/question';
import answerService from '../services/forms/answer';
import {
  AnswerFormQuestionsRequest,
  CreateFormQuestionsRequest,
} from '../types';

const createForm = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { questions, eventId } = req.body as CreateFormQuestionsRequest;

    const formId = await formService.createForm({
      eventId,
    });

    const questionsData = questions.map((questionData) => ({
      formId,
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
      const optionsForQuestion = await optionsService.getOptionsForQuestion(question.id);

      questionsWithOptions.push({
        ...question,
        displayText: [question.displayText],
        name: question.id,
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
  answerFormQuestions,
};
