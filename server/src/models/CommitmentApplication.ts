import mongoose, { Schema } from 'mongoose';
import { CommitmentApplicationData } from '../types';

export type CommitmentApplicationModel = CommitmentApplicationData & mongoose.Document;

const CommitmentApplicationSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  volunteer_data: {
    type: mongoose.Types.ObjectId,
    ref: 'Volunteer',
  },
  created_at: Date,
});

export default mongoose.model<CommitmentApplicationModel>('CommitmentApplication', CommitmentApplicationSchema);
