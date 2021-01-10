import { EventPostData } from '@type/event';
import {
  CITIZENSHIP,
  GENDER,
  RACE,
  SOCIAL_MEDIA_PLATFORMS,
  VOLUNTEER_TYPE,
} from '@type/volunteer';

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

export type QueryParams = {
  pageNo?: number;
  size?: number;
  [field: string]: any;
};

export type CreateEventRequest = EventPostData;

export type EditEventRequest = {
  id: string;
  data: EventPostData;
};

export type GetEventParams = string;
