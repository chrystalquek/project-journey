import mongoose from 'mongoose';
import Question, { QuestionData } from '../../models/Forms/Question';
import { Id } from '../../types';


/**
 * Bulk-insert questions attached to form
 * @param questions question data to be created
 */
const insertQuestions = async (questions: Array<Omit<QuestionData, '_id'>>): Promise<Array<mongoose.Types.ObjectId>> => {
  const questionIds: mongoose.Types.ObjectId[] = [];
  const bulkQuestions = questions.map((question) => {
    const questionId = new mongoose.Types.ObjectId();
    questionIds.push(questionId);
    return {
      _id: questionId,
      formId: question.formId,
      isRequired: question.isRequired,
      displayText: question.displayText,
      type: question.type,
    };
  });
  await Question.insertMany(bulkQuestions);
  return questionIds;
};

/**
 * Update questions in bulk for a form
 * @param updatedQuestions Array of `QuestionData`
 */
const updateQuestions = async (updatedQuestions: Array<Partial<QuestionData>>): Promise<void> => {
  // Bulk update supported but for same condition, reads in parallel
  await Promise.all(updatedQuestions.map(async (question) => {
    await Question.findOneAndUpdate({
      _id: question._id,
    }, question);
  }));
};

/**
 * Retrieve all questsions from specified form id
 * @param formId Mongoose form id
 */
const getQuestions = async (formId: Id): Promise<Array<QuestionData>> => {
  const questions = await Question.find({
    formId,
  }).lean().exec();
  return questions
};

export default {
  insertQuestions,
  updateQuestions,
  getQuestions,
};
