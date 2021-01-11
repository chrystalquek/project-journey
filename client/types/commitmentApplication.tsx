export enum CommitmentApplicationStatus {
    Pending = 'pending',
    Accepted = 'accepted',
    Rejected = 'rejected'
}

export type CommitmentApplicationStatusType = CommitmentApplicationStatus.Pending | CommitmentApplicationStatus.Accepted | CommitmentApplicationStatus.Rejected

export type CommitmentApplicationData = {
    _id: string,
    volunteerId: string
    status: CommitmentApplicationStatus,
    createdAt: Date,

    // List of questions in the application form
    // yet to be determined, waiting for BD team
}
