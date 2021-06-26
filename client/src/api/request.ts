import { VolunteerData } from "@type/volunteer";
import { SignUpData, SignUpIdType } from "@type/signUp";
import {
  CommitmentApplicationData,
  CommitmentApplicationStatus,
} from "@type/commitmentApplication";
import { EventData, EventSearchType } from "@type/event";
import { AnswerData } from "@type/form/answer";

// login

export type LoginRequest = {
  email: string;
  password: string;
};

// events

export type CreateEventRequest = Omit<EventData, "_id" | "createdAt"> & {
  questions: Array<QuestionsOptionsRequestData>;
};

export type GetEventsRequest = {
  eventType: EventSearchType;
};

export type GetSignedUpEventsRequest = {
  userId: string;
} & GetEventsRequest;

export type GetEventRequest = IdRequest;

export type UpdateEventRequest = {
  _id: string;
  data: Partial<EventData>;
};

export type DeleteEventRequest = IdRequest;

export type CancelEventRequest = IdRequest;

// volunteers

export type CreateVolunteerRequest = Omit<
  VolunteerData,
  "_id" | "createdAt"
> & { password: string; administratorRemarks?: string };

export type GetVolunteersPaginatedRequest = {
  pageNo?: number;
  size?: number;
  volunteerType?: string[];
  name?: string;
  sort?: string;
};

export type GetVolunteersByIdRequest = {
  ids: string[];
};

export type GetVolunteerRequest = IdRequest;

export type UpdateVolunteerRequest = {
  _id: string;
  data: Partial<VolunteerData>;
};

// sign up

export type CreateSignUpRequest = Omit<SignUpData, "_id" | "createdAt">;

export type GetSignUpsRequest = SignUpIdRequest;

export type UpdateSignUpRequest = {
  data: Partial<SignUpData>;
} & SignUpIdRequest;

export type DeleteSignUpRequest = SignUpIdRequest;

// commitment application

export type CreateCommitmentApplicationRequest = Omit<
  CommitmentApplicationData,
  "_id" | "createdAt"
>;

export type GetCommitmentApplicationsRequest = {
  status?: CommitmentApplicationStatus;
};

export type UpdateCommitmentApplicationRequest = {
  data: Partial<CommitmentApplicationData>;
} & IdRequest;

// form

export type FormQuestionType = "shortAnswer" | "mcq" | "checkboxes";

export type QuestionsOptionsRequestData = {
  displayText: string;
  type: FormQuestionType;
  isRequired: boolean;
  name: string;
  options: Array<{ content: string }>;
};
export interface CreateFormQuestionsRequest {
  eventId: string;
  questions: Array<QuestionsOptionsRequestData>;
}

export type GetEventFeedbackQuestionsRequest = IdRequest;

export interface AnswerFormQuestionsRequest {
  eventId: string;
  answers: Array<Omit<AnswerData, "_id" | "createdAt">>;
}

// image

export type UploadImageRequest = FormData;

export type UploadImageRequestWithField = {
  name: string;
  form: FormData;
};

// some commonly used types

type IdRequest = {
  _id: string;
};

type SignUpIdRequest = {
  id: string; // id to match against once idType is known
  idType: SignUpIdType;
};
