import mongoose from 'mongoose';
import Answer from '../../models/Forms/Answer';
import { AnswerData } from '../../types';
import formService from './form';

/**
 * Bulk-insert options attached to form
 * @param options Option answers for question
 */
const bulkInsertAnswers = async (answers: Array<AnswerData>): Promise<void> => {
  const bulkAnswers = answers.map((answer) => ({
    _id: new mongoose.Types.ObjectId(),
    questionId: answer.questionId,
    userId: answer.userId,
    content: answer.content,
    formId: answer.formId,
  }));
  await Answer.insertMany(bulkAnswers);
};

/**
 * Retrieves answers for specified question/form
 * At least one of the fields must exist
 * @param questionId
 * @param formId
 * @param userId
 */
const retrieveAnswers = async ({ questionId, formId, userId }:
  { questionId: string, formId?: string, userId?: string } | {
    questionId?: string, formId: string, userId: string
  }): Promise<Array<AnswerData>> => {
  const options = await Answer.find(questionId ? {
    questionId,
  } : { formId, userId }).lean().exec();
  return options.map((option) => ({
    questionId: option.questionId,
    userId: option.userId,
    formId: option.formId,
    content: option.content,
  }));
};

// just a helper for getting the status of feedback form for [signedup, past] events
// returns a boolean
const getFeedbackStatus = async (userId: string, eventId: string): Promise<boolean> => {
  const form = await formService.getForm(eventId);
  const formId = form._id as string;
  const answers = await retrieveAnswers({ formId, userId });
  const isAnswerPresent = answers.length > 0;
  return isAnswerPresent;
};

export default {
  bulkInsertAnswers,
  retrieveAnswers,
  getFeedbackStatus,
};
