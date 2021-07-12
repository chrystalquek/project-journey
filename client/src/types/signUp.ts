export type SignUpIdType = "eventId" | "userId" | "signUpId";

export enum SignUpStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export type SignUpData = {
  _id: string;
  eventId: string;
  userId: string;
  status: SignUpStatus;
  preferences: Array<string>;
  isRestricted: boolean;
  createdAt: string;
  acceptedRole?: string;
};
