import { Type, createSchema, typedModel, ExtractProps } from 'ts-mongoose';

const FormSchema = createSchema({
  eventId: Type.objectId({
    required: true,
    ref: 'Event',
  }),
});

export type FormData = Omit<ExtractProps<typeof FormSchema>, "__v">;

export default typedModel('Form', FormSchema);

