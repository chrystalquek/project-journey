import mongoose from 'mongoose';
import { FormData } from '../../types';

const { Schema } = mongoose;

export type FormModel = FormData & mongoose.Document

const FormSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  description: String,
  event_id: mongoose.Types.ObjectId,
});

export default mongoose.model<FormModel>('Form', FormSchema);
