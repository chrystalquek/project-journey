import mongoose from 'mongoose';
import { OptionData } from '../../types';

const { Schema } = mongoose;

export type OptionModel = OptionData & mongoose.Document

const OptionSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  questionId: {
    type: mongoose.Types.ObjectId,
    ref: 'Question',
  },
  text: String,
});

export default mongoose.model<OptionModel>('Option', OptionSchema);
