import { Type, createSchema, typedModel, ExtractProps } from 'ts-mongoose';

export const FORM_QUESTION_TYPE = ['shortAnswer', 'mcq', 'checkboxes'] as const
export type FormQuestionType = (typeof FORM_QUESTION_TYPE)[number]

const QuestionSchema = createSchema({
  formId: Type.objectId({
    required: true,
    ref: 'Form',
  }), // TODO inconsitent with FE: FE does not have formId
  displayText: Type.string({ required: true }),
  type: Type.string({
    required: true,
    enum: FORM_QUESTION_TYPE
  }),
  isRequired: Type.boolean({ required: true }),
  // TODO FE QuestionData has options?: Array<string>;
});

export type QuestionData = Omit<ExtractProps<typeof QuestionSchema>, "__v">;

export default typedModel('Question', QuestionSchema);

