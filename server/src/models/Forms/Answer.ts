import mongoose from 'mongoose';
import { AnswerData } from '../../types';

const { Schema } = mongoose;

export type AnswerModel = AnswerData & mongoose.Document

const AnswerSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  question_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Question',
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Volunteer',
  },
  form_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Form',
  },
  content: String,
});

export default mongoose.model<AnswerModel>('Answer', AnswerSchema);
