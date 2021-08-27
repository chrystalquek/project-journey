import CommitmentApplication, {
  CommitmentApplicationData,
  CommitmentApplicationStatus,
  NewCommitmentApplicationData,
} from "../models/CommitmentApplication";

const createCommitmentApplication = async (
  commitmentApplicationData: NewCommitmentApplicationData
): Promise<CommitmentApplicationData> => {
  const commitmentApplicationSchemaData = new CommitmentApplication(
    commitmentApplicationData
  );
  const savedCommitmentApplication =
    await commitmentApplicationSchemaData.save();
  return savedCommitmentApplication;
};

const getCommitmentApplications = async (
  status?: CommitmentApplicationStatus,
  volunteerId?: string
): Promise<CommitmentApplicationData[]> => {
  const query: any = {};
  if (status) {
    query.status = status;
  }
  if (volunteerId) {
    query.volunteerId = volunteerId;
  }
  const commitmentApplications = await CommitmentApplication.find(query);
  return commitmentApplications;
};

const updateCommitmentApplication = async (
  id: string,
  updatedFields: Partial<CommitmentApplicationData>
): Promise<CommitmentApplicationData> => {
  try {
    const commitmentApplication = await CommitmentApplication.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true }
    );
    if (!commitmentApplication) {
      throw new Error("Commitment Application is not found");
    } else {
      return commitmentApplication;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  createCommitmentApplication,
  getCommitmentApplications,
  updateCommitmentApplication,
};
