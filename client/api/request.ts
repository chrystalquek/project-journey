import {
  Race,
  VolunteerData,
} from '@type/volunteer';
import { SignUpData, SignUpIdType } from '@type/signUp';
import { CommitmentApplicationStatus } from '@type/commitmentApplication';
import { EventData, EventSearchType } from '@type/event';

export type SignUpRequest = VolunteerData

export type LoginRequest = {
  email: string;
  password: string;
};

export type GetVolunteersRequest = {
  pageNo: number,
  size: number
  volunteerType: string,
  name?: string
  sort: string
}

export type EventQueryParams = {
  userId?: string
  eventType: EventSearchType
}

export type CommitmentApplicationQueryParams = {
  status: CommitmentApplicationStatus
}

type EventPostData = Omit<EventData, '_id' | 'createdAt'> & { questions: Array<QuestionsOptionsRequestData> }

export type CreateEventRequest = EventPostData;

export type EditEventRequest = {
  id: string;
  data: EventPostData;
};

export type GetEventParams = string;

export type CancelEventParams = {
  eventId: string
}

export type DeleteEventRequest = {
  eventId: string
}

export type GetEventFeedbackFormQuestionsRequest = {
  eventId: string
}
export type UploadImageRequest = FormData;

export type UploadImageRequestWithField = {
  name: string;
  form: FormData;
};
export type CreateCommitmentApplicationRequest = {
  volunteerId: string;
  homeAddress: string,
  race: Race,
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
};

export type UpdateVolunteerRequest = {
  id: string;
  updatedVolunteerData: Partial<VolunteerData>;
};
export interface AnswerFormQuestionsRequest {
  eventId: string
  answers: Array<AnswerData>
}

export type FormQuestionType = 'shortAnswer' | 'mcq' | 'checkboxes'

export type QuestionsOptionsRequestData = {
  displayText: string;
  type: FormQuestionType;
  isRequired: boolean;
  name: string;
  options: Array<{ content: string }>
}

export interface CreateFormQuestionsRequest {
  eventId: string,
  questions: Array<QuestionsOptionsRequestData>
}

export type AnswerData = {
  questionId: string;
  userId: string;
  content: string;
}

// SIGN-UPS
export type SignUpQueryParams = {
  id: string; // id to match against once idType is known
  idType: SignUpIdType;
  eventId?: string; // eg use case is when signup is deleted and eventId and userId is needed to update specific event and roledata in redux
  userId?: string;
}

export type CreateSignUpRequest = Omit<SignUpData, '_id' | 'createdAt'>;

export type UpdateSignUpRequest = Omit<SignUpData, '_id' | 'createdAt'>;

export type GetVolunteerRequest = string;
