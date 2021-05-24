import { Type, createSchema, typedModel, ExtractProps } from 'ts-mongoose';

const OptionSchema = createSchema({
  questionId: Type.objectId({
    required: true,
    ref: 'Question',
  }),
  text: Type.string({ required: true }),
});

export type OptionData = Omit<ExtractProps<typeof OptionSchema>, "__v">;

export default typedModel('Option', OptionSchema);
