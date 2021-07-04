import { CommitmentApplicationData } from "@type/commitmentApplication";
import { EventData } from "@type/event";
import { QuestionItem } from "@type/form/question";
import { SignUpData } from "@type/signUp";
import { VolunteerData } from "@type/volunteer";

// TODO remove this by refactoring SignUpFormGenerator
export type SignUpResponse = Record<string, any>;

export type LoginResponse = {
  token: string;
};

// event

export type CreateEventResponse = EventData;

export type GetEventsResponse = {
  data: Array<EventData>;
};

export type GetEventResponse = EventData;

export type UpdateEventResponse = EventData;

// volunteers

export type CreateVolunteerResponse = VolunteerData;

export type GetVolunteersResponse = {
  data: Array<VolunteerData>;
};

export type GetVolunteersPaginatedResponse = GetVolunteersResponse & {
  count: number;
};

export type GetVolunteerResponse = VolunteerData;

export type UpdateVolunteerResponse = VolunteerData;

// sign up

export type CreateSignUpResponse = SignUpData;

export type GetSignUpsResponse = {
  data: Array<SignUpData>;
};

export type UpdateSignUpResponse = SignUpData;

export type CreateUpdateSignUpResponse = SignUpData;

// commitment application

export type CreateCommitmentApplicationResponse = CommitmentApplicationData;

export type GetCommitmentApplicationsResponse = {
  data: Array<CommitmentApplicationData>;
};

export type UpdateCommitmentApplicationResponse = CommitmentApplicationData;

// file
export type UploadFileResponse = { url: string };

// form

export type GetEventFeedbackQuestionsResponse = Array<QuestionItem>;
