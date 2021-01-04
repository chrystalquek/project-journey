import mongoose from 'mongoose';
import commitmentApplication from '../controllers/commitmentApplication';
import CommitmentApplication from '../models/CommitmentApplication';
import { CommitmentApplicationData } from '../types';

const createCommitmentApplication = async (
  commitmentApplicationData: CommitmentApplicationData,
): Promise<void> => {
  const commitmentApplicationSchemaData: mongoose.Document = new CommitmentApplication({
    _id: new mongoose.Types.ObjectId(),
    volunteer_data: mongoose.Types.ObjectId(commitmentApplicationData.volunteerId),
    created_at: Date.now(),
    // TODO: @matt setup timestamp
  });
  const savedCommitmentApplication = await commitmentApplicationSchemaData.save();
  // debugging purpose
  console.log(`Saved: ${JSON.stringify(savedCommitmentApplication)}`);
};

const readCommitmentApplications = async (): Promise<CommitmentApplicationData[]> => {
  const commitmentApplications = await CommitmentApplication.find({}).populate('volunteer_data');
  return commitmentApplications;
};

export default {
  createCommitmentApplication,
  readCommitmentApplications,
};
