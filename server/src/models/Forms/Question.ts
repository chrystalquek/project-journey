import mongoose from 'mongoose';
import { QuestionData } from '../../types';

const { Schema } = mongoose;

export type QuestionModel = QuestionData & mongoose.Document

const QuestionSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  formId: {
    type: mongoose.Types.ObjectId,
    ref: 'Form',
  },
  displayText: String,
  type: String,
  isRequired: Boolean,
});

export default mongoose.model<QuestionModel>('Question', QuestionSchema);
