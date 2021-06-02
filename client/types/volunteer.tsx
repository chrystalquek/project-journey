export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Citizenship {
  SINGAPORE = 'singapore',
  PR = 'permanent_resident',
  FOREIGNER = 'foreigner',
}

export enum Race {
  CHINESE = 'chinese',
  MALAY = 'malay',
  INDIAN = 'indian',
  CAUCASIAN = 'caucasian',
  OTHER = 'other',
}

export enum LeadershipInterest {
  YES = 'yes',
  NO = 'no',
  MAYBE = 'maybe',
}

export const PERSONALITY_TYPES_REGEX = /(I|E)(N|S)(F|T)(J|P)-(A|T)/;

export enum SocialMediaPlatform {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  SNAPCHAT = 'snapchat',
  EMAIL = 'email',
  OTHER = 'other',
}

export enum VolunteerType {
  ADHOC = 'ad-hoc',
  COMMITTED = 'committed',
  ADMIN = 'admin'
}

export type VolunteerData = {
  _id: string;
  volunteerType: VolunteerType;
  name: string;
  password: string;
  nickname?: string;
  gender: Gender;
  citizenship: Citizenship;
  birthday?: Date;
  address?: string;
  mobileNumber: string;
  photoUrl: string;
  email: string;

  socialMediaPlatform: SocialMediaPlatform;
  instagramHandle?: string;

  organization?: string;
  position?: string;
  race?: Race;

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

  personality?: string; // Myers-Briggs // validate by REGEX
  strengths?: string;
  volunteeringOpportunityInterest?: string;

  volunteerReason: string; // Essay
  volunteerContribution?: string;
  hasCriminalRecord: boolean;

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

  // Remarks
  volunteerRemarks?: string;
  administratorRemarks?: string;

  // Event count
  volunteeringSessionsCount: number;
  workshopsCount: number;
  hangoutsCount: number;

  // Record of commitment applications
  commitmentApplicationIds: Array<string>;

  createdAt: Date; // used for member since
};
