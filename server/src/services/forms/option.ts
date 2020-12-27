import mongoose from 'mongoose';
import Option from '../../models/Forms/Option';
import { OptionData } from '../../types';

/**
 * Bulk-insert options attached to form
 * @param options Option answers for question
 */
const createOptionsForQuestion = async (options: Array<Omit<OptionData, 'id'>>): Promise<void> => {
  const bulkOptions = options.map((option) => ({
    _id: new mongoose.Types.ObjectId(),
    question_id: option.questionId,
    text: option.text,
  }));
  await (new Option(bulkOptions)).save();
};

/**
 * Update questions in bulk for a form
 * @param updatedOptions Array of `QuestionData`
 */
const updateQuestions = async (updatedOptions: Array<Partial<OptionData>>): Promise<void> => {
  // Bulk update for different conditions in parallel
  await Promise.all(updatedOptions.map(async (option) => {
    await Option.findOneAndUpdate({
      _id: option.id,
    }, option);
  }));
};

/**
 * Retrieve all questsions from specified form id
 * @param formId Mongoose form id
 */
const getOptionsForQuestion = async (formId: string): Promise<Array<OptionData>> => {
  const options = await Option.find({
    formId,
  }).lean().exec();
  return options.map((option) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: option._id,
    questionId: option.questionId,
    text: option.text,
  }));
};

export default {
  createOptionsForQuestion,
  updateQuestions,
  getOptionsForQuestion,
};
