import mongoose from 'mongoose';
import { SignUpData } from '../types';

const { Schema } = mongoose;

export type SignUpModel = SignUpData & mongoose.Document;
export const SIGN_UP_STATUS = ['pending', ['accepted', String], 'rejected'];

const SignUpSchema = new Schema({
  signUpId: String,
  eventId: String,
  userId: String,
  status: {
    type: Schema.Types.Mixed,
    enum: SIGN_UP_STATUS,
  },
  preferences: [String],
  isRestricted: Boolean,
});

export default mongoose.model<SignUpModel>('SignUp', SignUpSchema);
