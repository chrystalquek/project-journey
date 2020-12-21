import mongoose from 'mongoose';
import Question from '../../models/Forms/Question';
import { QuestionData } from '../../types';

/**
 * Bulk-insert questions attached to form
 * @param questions question data to be created
 */
const insertQuestions = async (questions: Array<QuestionData>): Promise<void> => {
  const bulkQuestions = questions.map((question) => ({
    _id: new mongoose.Types.ObjectId(),
    form_id: question.formId,
    is_required: question.isRequired,
    texst: question.text,
  }));
  await (new Question(bulkQuestions)).save();
};

/**
 * Update questions in bulk for a form
 * @param updatedQuestions Array of `QuestionData`
 */
const updateQuestions = async (updatedQuestions: Array<Partial<QuestionData>>): Promise<void> => {
  // Bulk update supported but for same condition, reads in parallel
  await Promise.all(updatedQuestions.map(async (question) => {
    await Question.findOneAndUpdate({
      _id: question.id,
    }, question);
  }));
};

/**
 * Retrieve all questsions from specified form id
 * @param formId Mongoose form id
 */
const getQuestions = async (formId: string): Promise<Array<QuestionData>> => {
  const questions = await Question.find({
    formId,
  }).lean().exec();
  return questions.map((question) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: question._id,
    formId: question.formId,
    isRequired: question.isRequired,
    text: question.text,
    type: question.type,
  }));
};

export default {
  insertQuestions,
  updateQuestions,
  getQuestions,
};
