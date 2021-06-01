import {
  CITIZENSHIP,
  GENDER,
  RACE,
  SOCIAL_MEDIA_PLATFORMS,
  VOLUNTEER_TYPE,
  VolunteerData,
} from '@type/volunteer';
import { SignUpData, SignUpIdType, SignUpStatus } from '@type/signUp';
import { CommitmentApplicationStatus } from '@type/commitmentApplication';
import { EventPostData, EventSearchType } from '@type/event';

export type SignUpRequest = {
  name: string;
  password?: string;
  volunteerType: VOLUNTEER_TYPE;

  nickname: string;
  gender: GENDER;
  citizenship: CITIZENSHIP;
  birthday: Date;
  address: string;
  mobileNumber: string;
  photoUrl: string;
  email: string;
  description?: string;

  socialMediaPlatform: SOCIAL_MEDIA_PLATFORMS;
  instagramHandle?: string;

  organization?: string;
  position?: string;
  race?: RACE;

  languages: Array<string>;
  referralSources: Array<string>;

  hasVolunteered: boolean;
  biabVolunteeringDuration?: number; // Number of months

  hasVolunteeredExternally: boolean;
  volunteeringExperience?: string;

  hasChildrenExperience: boolean;
  childrenExperience?: string;

  sessionsPerMonth?: number;
  sessionPreference?: string; // pre-defined session committment

  hasFirstAidCertification?: boolean;
  leadershipInterest?: string;
  interests?: string; // short-ans

  skills?: Array<string>;

  personality?: string; // Myers-Briggs
  strengths?: Array<string>;
  volunteeringOpportunityInterest?: string;

  volunteerReason: string; // Essay
  volunteerContribution?: string;

  // WCA Registration: Medical Information
  hasMedicalNeeds: boolean;
  medicalNeeds?: string;
  hasAllergies: boolean;
  allergies?: string;
  hasMedicationDuringDay: boolean;

  // WCA Registration: Emergency Contact
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactEmail: string;
  emergencyContactRelationship: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type GetVolunteersPaginatedRequest = {
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
};

export type UpdateVolunteerRequest = {
  email: string;
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

export type CreateSignUpRequest = Omit<SignUpData, '_id' | 'signUpId'>;

export type UpdateSignUpRequest = Omit<SignUpData, '_id' | 'signUpId'>;

export type GetVolunteerRequest = string;
