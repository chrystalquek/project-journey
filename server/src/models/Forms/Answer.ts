import mongoose from 'mongoose';
import { AnswerData } from '../../types';

const { Schema } = mongoose;

export type AnswerModel = AnswerData & mongoose.Document

const AnswerSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  question_id: mongoose.Types.ObjectId,
  option_id: mongoose.Types.ObjectId,
  user_id: mongoose.Types.ObjectId,
  text: String,
});

export default mongoose.model<AnswerModel>('Answer', AnswerSchema);
