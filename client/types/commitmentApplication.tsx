import { RACE } from "./volunteer"

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
    homeAddress: string,
    race: RACE,
    biabVolunteeringDuration: string,
    hasVolunteeredExternally: boolean,
    volunteeringExperience: string,
    hasChildrenExperience: boolean,
    childrenExperience: string,
    sessionsPerMonth: boolean,
    sessionPreference: string,
    hasFirstAidCertification: boolean,
    leadershipInterest: string,
    interests: string,
    skills: [string],
    personality: string,
    strengths: string,
    volunteerContribution: string,
    hasCriminalRecord: boolean
}