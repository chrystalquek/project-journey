import mongoose from 'mongoose';
import { QuestionData } from '../../types';

const { Schema } = mongoose;

export type QuestionModel = QuestionData & mongoose.Document

const QuestionSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  form_id: mongoose.Types.ObjectId,
  text: String,
  isRequired: Boolean,
});

export default mongoose.model<QuestionModel>('Question', QuestionSchema);
