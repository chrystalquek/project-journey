import mongoose, { Schema } from 'mongoose';
import { CommitmentApplicationData } from '../types';

export type CommitmentApplicationModel = CommitmentApplicationData & mongoose.Document;

export const COMMITMENT_APPLICATION_STATUS = ['pending', 'accepted', 'rejected'];
export const RACE = ['chinese', 'malay', 'indian', 'caucasian', 'other'];

const CommitmentApplicationSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  volunteerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Volunteer',
  },
  status: {
    type: String,
    enum: COMMITMENT_APPLICATION_STATUS,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  homeAddress: String,
  race: {
    type: String,
    enum: RACE,
  },
  biabVolunteeringDuration: String,
  hasVolunteeredExternally: Boolean,
  volunteeringExperience: String,
  hasChildrenExperience: Boolean,
  childrenExperience: String,
  sessionsPerMonth: Number,
  sessionPreference: String,
  hasFirstAidCertification: Boolean,
  leadershipInterest: String,
  interests: String,
  skills: [String],
  personality: String,
  strengths: String,
  volunteerContribution: String,
  hasCriminalRecord: Boolean
});

export default mongoose.model<CommitmentApplicationModel>('CommitmentApplication', CommitmentApplicationSchema);
