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
    homeAddress: commitmentApplicationData.homeAddress,
    race: commitmentApplicationData.race,
    biabVolunteeringDuration: commitmentApplicationData.biabVolunteeringDuration,
    hasVolunteeredExternally: commitmentApplicationData.hasVolunteeredExternally,
    volunteeringExperience: commitmentApplicationData.volunteeringExperience,
    hasChildrenExperience: commitmentApplicationData.hasChildrenExperience,
    childrenExperience: commitmentApplicationData.childrenExperience,
    sessionsPerMonth: commitmentApplicationData.sessionsPerMonth,
    sessionPreference: commitmentApplicationData.sessionPreference,
    hasFirstAidCertification: commitmentApplicationData.hasFirstAidCertification,
    leadershipInterest: commitmentApplicationData.leadershipInterest,
    interests: commitmentApplicationData.interests,
    skills: commitmentApplicationData.skills,
    personality: commitmentApplicationData.personality,
    strengths: commitmentApplicationData.strengths,
    volunteerContribution: commitmentApplicationData.volunteerContribution,
    hasCriminalRecord: commitmentApplicationData.hasCriminalRecord
  });
  const savedCommitmentApplication = await commitmentApplicationSchemaData.save();
  return savedCommitmentApplication.toObject();
};

const readCommitmentApplications = async (status?: CommitmentApplicationStatus):
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
  readCommitmentApplications,
  updateCommitmentApplication,
};
