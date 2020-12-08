import mongoose from 'mongoose';
import { SignUpData } from '../types';

const { Schema } = mongoose;

export type SignUpModel = SignUpData & mongoose.Document;

const SignUpSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  event_id: String,
  user_id: String,
  status: {
    type: String,
    enum: ['pending', 'accepted, rejected'],
  },
  preferences: [String],
  is_restricted: Boolean,
});

export default mongoose.model<SignUpModel>('SignUp', SignUpSchema);
