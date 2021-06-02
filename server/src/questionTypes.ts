import { AnswerData } from "./models/Forms/Answer";
import { FormQuestionType } from "./models/Forms/Question";

// TODO no clue what's going on here so couldn't sort out the types

export type QuestionsOptionsRequestData = {
    displayText: string;
    type: FormQuestionType;
    isRequired: boolean;
    name: string;
    options: Array<{ content: string }>
}
export interface CreateFormQuestionsRequest {
    eventId: string,
    questions: Array<QuestionsOptionsRequestData>
}

export interface AnswerFormQuestionsRequest {
    eventId: string
    answers: Array<AnswerData>
}