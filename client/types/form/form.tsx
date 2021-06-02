import { QuestionItem } from "./question";
import { FormDisabledReason } from '@utils/helpers/event/EventDetails/EventDetails';
import { SignUpData } from '@type/signUp';

// all types only used by FE

export type QuestionList = Array<QuestionItem>;

export type QuestionsWithHeader = {
    header: string;
    info?: string;
    questionList: QuestionList;
}

export type HeaderQuestionList = Array<QuestionsWithHeader>;

// Contains types used in /event
export type FormStatus = {
    disabled: boolean,
    reason: FormDisabledReason,
    details: {
        acceptedSignUp: SignUpData | null,
    }
}
