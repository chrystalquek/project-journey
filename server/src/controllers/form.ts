/* eslint-disable no-await-in-loop */
import HTTP_CODES from '../constants/httpCodes';
import formService from '../services/forms/form';
import optionsService from '../services/forms/option';
import questionService from '../services/forms/question';
import answerService from '../services/forms/answer';
import { AnswerFormQuestionsRequest, CreateFormRequest, GetEventFormRequest } from '../types/request/form';
import { AnswerFormQuestionsResponse, CreateFormResponse, GetEventFormResponse, QuestionsOptionsResponseData } from '../types/response/form';

const createForm = async (req: CreateFormRequest, res: CreateFormResponse): Promise<void> => {
  try {
    const {
      questions,
      eventId,
    } = req.body;

    const form = await formService.createForm({
      eventId
    });

    const formId = form._id

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
    res.status(HTTP_CODES.OK).send(form);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const getEventFormDetails = async (req: GetEventFormRequest, res: GetEventFormResponse): Promise<void> => {
  const { eventId } = req.params;

  try {
    const form = await formService.getForm(eventId);
    const questions = await questionService.getQuestions(form._id);

    // TODO: Replace <any> with custom Question Option type
    const questionsWithOptions: Array<QuestionsOptionsResponseData> = [];
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

const answerFormQuestions = async (req: AnswerFormQuestionsRequest, res: AnswerFormQuestionsResponse): Promise<void> => {
  let { answers } = req.body;
  const { eventId } = req.body;

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
