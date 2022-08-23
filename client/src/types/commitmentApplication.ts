export enum CommitmentApplicationStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export type CommitmentApplicationData = {
  _id: string;
  volunteerId: string;
  status: CommitmentApplicationStatus;
  createdAt: string;
};
