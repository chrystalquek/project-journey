import { Type, createSchema, ExtractProps } from 'ts-mongoose';
import mongoose from 'mongoose';

export const COMMITMENT_APPLICATION_STATUS = ['pending', 'accepted', 'rejected'] as const;
export type CommitmentApplicationStatus = (typeof COMMITMENT_APPLICATION_STATUS)[number]

const CommitmentApplicationSchema = createSchema({
  volunteerId: Type.objectId({
    required: true,
    ref: 'Volunteer',
  }),
  status: Type.string({
    required: true,
    enum: COMMITMENT_APPLICATION_STATUS,
    default: 'pending',
  }),
  createdAt: Type.date({
    required: true,
    default: Date.now,
  }),
});

export type CommitmentApplicationData = Omit<ExtractProps<typeof CommitmentApplicationSchema>, "__v" | "_id" | "volunteerId"> & { _id: string, volunteerId: string };

export type NewCommitmentApplicationData = Omit<CommitmentApplicationData, "_id" | "createdAt">

type CommitmentApplicationModel = CommitmentApplicationData & mongoose.Document
export default mongoose.model<CommitmentApplicationModel>('CommitmentApplication', CommitmentApplicationSchema)
