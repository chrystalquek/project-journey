import mongoose from 'mongoose';
import Option from '../../models/Forms/Option';
import { OptionClientData, OptionData } from '../../types';

/**
 * Bulk-insert options attached to form
 * @param options Option answers for question
 */
const createOptionsForQuestion = async (options: Array<Omit<OptionData, 'id'>>): Promise<void> => {
  const bulkOptions = options.map((option) => ({
    _id: new mongoose.Types.ObjectId(),
    questionId: option.questionId,
    text: option.text,
  }));
  await Option.insertMany(bulkOptions);
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
 * @param questionId Mongoose question id
 */
const getOptionsForQuestion = async (questionId: string): Promise<Array<OptionClientData>> => {
  const options = await Option.find({
    questionId,
  }).lean().exec();
  return options.map((option) => ({
    label: option.text,
    value: option.text,
  }));
};

export default {
  createOptionsForQuestion,
  updateQuestions,
  getOptionsForQuestion,
};
