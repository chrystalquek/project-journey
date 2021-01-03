import mongoose from 'mongoose';
import commitmentApplication from '../controllers/commitmentApplication';
import CommitmentApplication from '../models/CommitmentApplication';
import { CommitmentApplicationData } from '../types';

const createCommitmentApplication = async (
  commitmentApplicationData: CommitmentApplicationData
  ): Promise<void> => {
  const commitmentApplicationSchemaData: mongoose.Document = new CommitmentApplication({
    _id: new mongoose.Types.ObjectId(),
    volunteerData: commitmentApplicationData.volunteerData,
    createdAt: commitmentApplicationData.createdAt
  });
  const savedCommitmentApplication = await commitmentApplicationSchemaData.save()
  // debugging purpose
  console.log(JSON.stringify(savedCommitmentApplication))
}

const readCommitmentApplications = async (): Promise<CommitmentApplicationData[]> => {
  const commitmentApplications = await CommitmentApplication.find({}).populate('volunteers')
  return commitmentApplications
}

export default {
  createCommitmentApplication,
  readCommitmentApplications
}