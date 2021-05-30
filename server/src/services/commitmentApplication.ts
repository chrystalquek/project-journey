import mongoose from 'mongoose';
import CommitmentApplication from '../models/CommitmentApplication';
import { CommitmentApplicationData, CommitmentApplicationStatus } from '../types';

const createCommitmentApplication = async (
  commitmentApplicationData: CommitmentApplicationData,
): Promise<CommitmentApplicationData> => {
  const commitmentApplicationSchemaData: mongoose.Document = new CommitmentApplication({
    _id: new mongoose.Types.ObjectId(),
    volunteerId: mongoose.Types.ObjectId(commitmentApplicationData.volunteerId),
    createdAt: Date.now(),
  });
  const savedCommitmentApplication = await commitmentApplicationSchemaData.save();
  return savedCommitmentApplication.toObject();
};

const getCommitmentApplications = async (status?: CommitmentApplicationStatus):
  Promise<CommitmentApplicationData[]> => {
  const commitmentApplications = await (status
    ? CommitmentApplication.find({ status })
    : CommitmentApplication.find({}));
  return commitmentApplications;
};

const updateCommitmentApplication = async (
  id: string,
  updatedFields: Partial<CommitmentApplicationData>,
): Promise<CommitmentApplicationData> => {
  try {
    const commitmentApplication = await CommitmentApplication.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true },
    );
    if (!commitmentApplication) {
      throw new Error('Commitment Application is not found');
    } else {
      return commitmentApplication;
    }
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  createCommitmentApplication,
  getCommitmentApplications,
  updateCommitmentApplication,
};
