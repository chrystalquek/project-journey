import Answer, { AnswerData } from "../../models/Forms/Answer";
import formService from "./form";

/**
 * Bulk-insert options attached to form
 * @param options Option answers for question
 */
const bulkInsertAnswers = async (answers: Array<AnswerData>): Promise<void> => {
  const bulkAnswers = answers.map((answer) => ({
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
const retrieveAnswers = async ({
  questionId,
  formId,
  userId,
}:
  | { questionId: string; formId?: string; userId?: string }
  | {
      questionId?: string;
      formId: string;
      userId: string;
    }): Promise<Array<AnswerData>> => {
  const options = await Answer.find(
    questionId
      ? {
          questionId,
        }
      : { formId, userId }
  )
    .lean()
    .exec();
  return options;
};

// just a helper for getting the status of feedback form for [signedup, past] events
// returns a boolean
const getFeedbackStatus = async (
  userId: string,
  eventId: string
): Promise<boolean> => {
  const form = await formService.getForm(eventId);
  const formId = form._id;
  const answers = await retrieveAnswers({ formId, userId });
  const isAnswerPresent = answers.length > 0;
  return isAnswerPresent;
};

export default {
  bulkInsertAnswers,
  retrieveAnswers,
  getFeedbackStatus,
};
