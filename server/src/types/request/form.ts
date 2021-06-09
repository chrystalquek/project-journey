

import { AnswerData } from "../../models/Forms/Answer";
import { FormQuestionType } from "../../models/Forms/Question";
import { EmptyBody, EmptyQuery, Request, IdParams, IdRequest } from "./common";

export type QuestionsOptionsRequestData = {
    displayText: string;
    type: FormQuestionType;
    isRequired: boolean;
    name: string;
    options: Array<{ content: string }>
}

type CreateFormRequestBody = {
    questions: QuestionsOptionsRequestData[],
    eventId: string
}

export type CreateFormRequest = Request<CreateFormRequestBody>

type GetEventFormRequestParams = { eventId: string }

export type GetEventFormRequest = Request<EmptyBody, EmptyQuery, GetEventFormRequestParams>

type AnswerFormQuestionsRequestBody = {
    answers: AnswerData[],
    eventId: string
}

export type AnswerFormQuestionsRequest = Request<AnswerFormQuestionsRequestBody>
