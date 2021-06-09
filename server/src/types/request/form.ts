import { NewAnswerData } from "../../models/Forms/Answer";
import { FormQuestionType } from "../../models/Forms/Question";
import { EmptyBody, EmptyQuery, Request } from "./common";

export type QuestionsOptionsRequestData = {
    displayText: string;
    type: FormQuestionType;
    isRequired: boolean;
    name: string;
    options: Array<{ content: string }>
}

type CreateFormRequestBody = {
    eventId: string,
    questions: QuestionsOptionsRequestData[],
}

export type CreateFormRequest = Request<CreateFormRequestBody>

type GetEventFormRequestParams = { eventId: string }

export type GetEventFormRequest = Request<EmptyBody, EmptyQuery, GetEventFormRequestParams>

type AnswerFormQuestionsRequestBody = {
    eventId: string,
    answers: NewAnswerData[],
}

export type AnswerFormQuestionsRequest = Request<AnswerFormQuestionsRequestBody>
