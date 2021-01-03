import mongoose, { Schema } from 'mongoose'
import { CommitmentApplicationData } from '../types'

export type CommitmentApplicationModel = CommitmentApplicationData & mongoose.Document;

const CommitmentApplicationSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  volunteerData: {
    type: mongoose.Types.ObjectId,
    ref: 'Volunteer'
  },
  createdAt: {
    type: Date
  }
})

export default mongoose.model<CommitmentApplicationModel>('CommitmentApplication', CommitmentApplicationSchema)