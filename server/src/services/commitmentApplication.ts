import mongoose from 'mongoose';
import CommitmentApplication, { CommitmentApplicationData, CommitmentApplicationStatus } from '../models/CommitmentApplication';

const createCommitmentApplication = async (
  commitmentApplicationData: Partial<CommitmentApplicationData>,
): Promise<CommitmentApplicationData> => {
  const commitmentApplicationSchemaData: mongoose.Document = new CommitmentApplication({
    volunteerId: mongoose.Types.ObjectId(commitmentApplicationData.volunteerId)
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
