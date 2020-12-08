import mongoose from 'mongoose';
import { SignUpData } from '../types';

const { Schema } = mongoose;

export type SignUpModel = SignUpData & mongoose.Document;

const SignUpSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  event_id: String,
  user_id: String,
  role: {
    type: String,
    enum: ['Accepted, Rejected'],
  },
  preferences: [String],
  isAdHoc: Boolean,
});

export default mongoose.model<SignUpModel>('SignUp', SignUpSchema);
