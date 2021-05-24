import { Type, createSchema, typedModel, ExtractProps } from 'ts-mongoose';

const AnswerSchema = createSchema({
  questionId: Type.objectId({
    required: true,
    ref: 'Question',
  }),
  userId: Type.objectId({
    required: true,
    ref: 'Volunteer',
  }),
  formId: Type.objectId({
    required: false,
    ref: 'Form',
  }), // TODO conflict with FE: FE does not have formId
  content: Type.string({ required: true }),
});

export type AnswerData = Omit<ExtractProps<typeof AnswerSchema>, "__v">;

export default typedModel('Answer', AnswerSchema);
