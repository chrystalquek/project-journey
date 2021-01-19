export type FormQuestionType = 'short-answer' | 'mcq' | 'check-box'

export type QuestionData = {
    id: string;
    text: string;
    type: FormQuestionType;
    formId: string;
    isRequired: boolean;
}

export type OptionData = {
    id: string
    questionId: string;
    text: string;
}

export type QuestionWithOptions = QuestionData & {
    options: OptionData
}
