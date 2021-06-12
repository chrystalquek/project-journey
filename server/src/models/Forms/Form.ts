import { Type, createSchema, ExtractProps } from 'ts-mongoose';
import mongoose from 'mongoose';

const FormSchema = createSchema({
  eventId: Type.objectId({
    required: true,
    ref: 'Event',
  }),
});

export type FormData = Omit<ExtractProps<typeof FormSchema>, "__v" | "_id" | "eventId"> & {
  _id: string,
  eventId: string
};

export type NewFormData = Omit<FormData, "_id">

type FormModel = FormData & mongoose.Document
export default mongoose.model<FormModel>('Form', FormSchema);

