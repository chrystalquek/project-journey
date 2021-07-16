import { FormData } from "../../models/Forms/Form";
import { FormQuestionType } from "../../models/Forms/Question";
import { Response } from "./common";

export type CreateFormResponse = Response<FormData>;

export type QuestionsOptionsResponseData = {
  formId: string;
  displayText: string[];
  type: FormQuestionType;
  isRequired: boolean;
  name: string;
  options: Array<{ label: string; value: string }>;
};

export type GetEventFormResponse = Response<
  Array<QuestionsOptionsResponseData>
>;

export type AnswerFormQuestionsResponse = Response;
