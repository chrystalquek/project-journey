import { OptionType } from "./option";

export type FormQuestionType = 'short-answer' | 'mcq' | 'check-box'

export type QuestionsOptionsRequestData = {
    displayText: string;
    type: FormQuestionType;
    isRequired: boolean;
    name: string;
    options: Array<{ content: string }>
}

// used for FE only
export type InputType =
    | 'shortAnswer'
    | 'longAnswer'
    | 'checkboxes'
    | 'date'
    | 'mcq'
    | 'password'
    | 'photo'
    | 'number';

export type QuestionItem = {
    name: string;
    displayText: Array<string | JSX.Element>;
    type: InputType;
    initialValue: string | Date | number | [] | boolean | null;
    options?: Array<OptionType>;
    isRequired: boolean;
};