import mongoose from 'mongoose';
import { SignUpData } from '../types';

const { Schema } = mongoose;

export type SignUpModel = SignUpData & mongoose.Document;
export const SIGN_UP_STATUS = ['pending', 'accepted, rejected']

const SignUpSchema = new Schema({
  sign_up_id: String,
  event_id: String,
  user_id: String,
  status: {
    type: String,
    enum: SIGN_UP_STATUS,
  },
  preferences: [String],
  is_restricted: Boolean,
});

export default mongoose.model<SignUpModel>('SignUp', SignUpSchema);
