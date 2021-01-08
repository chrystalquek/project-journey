import mongoose, { Schema } from 'mongoose';
import { CommitmentApplicationData } from '../types';

export type CommitmentApplicationModel = CommitmentApplicationData & mongoose.Document;

export const COMMITMENT_APPLICATION_STATUS = ['pending', 'accepted', 'rejected'];

const CommitmentApplicationSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  volunteerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Volunteer',
  },
  status: {
    type: String,
    enum: COMMITMENT_APPLICATION_STATUS,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<CommitmentApplicationModel>('CommitmentApplication', CommitmentApplicationSchema);
