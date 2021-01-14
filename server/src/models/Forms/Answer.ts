import mongoose from 'mongoose';
import { AnswerData } from '../../types';

const { Schema } = mongoose;

export type AnswerModel = AnswerData & mongoose.Document

const AnswerSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  questionId: {
    type: mongoose.Types.ObjectId,
    ref: 'Question',
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'Volunteer',
  },
  formId: {
    type: mongoose.Types.ObjectId,
    ref: 'Form',
  },
  content: String,
});

export default mongoose.model<AnswerModel>('Answer', AnswerSchema);
