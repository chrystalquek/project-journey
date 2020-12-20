import mongoose from 'mongoose';
import { FormData } from '../../types';

const { Schema } = mongoose;

const FORM_TYPE = ['short-answer', 'mcq', 'checkbox'];

export type FormModel = FormData & mongoose.Document

const FormSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  description: String,
  type: {
    type: String,
    enum: FORM_TYPE,
  },
  event_id: mongoose.Types.ObjectId,
});

export default mongoose.model<FormModel>('Form', FormSchema);
