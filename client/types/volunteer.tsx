export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

export enum CITIZENSHIP {
  SINGAPORE = 'singapore',
  PR = 'permanent_resident',
  FOREIGNER = 'foreigner',
}

export enum RACE {
  CHINESE = 'chinese',
  MALAY = 'malay',
  INDIAN = 'indian',
  CAUCASIAN = 'caucasian',
  OTHER = 'other',
}

export enum LEADERSHIP_INTEREST {
  YES = 'yes',
  NO = 'no',
  MAYBE = 'maybe',
}

export enum PERSONALITY {
  INTJ_A = 'INTJ_A',
  INTJ_T = 'INTJ_T',
  INTP_A = 'INTP_A',
  INTP_T = 'INTP_T',
  ENTJ_A = 'ENTJ_A',
  ENTJ_T = 'ENTJ_T',
  ENFP_A = 'ENFP_A',
  ENFP_T = 'ENFP_T',
  ISTJ_A = 'ISTJ_A',
  ISTJ_T = 'ISTJ_T',
  ISFJ_A = 'ISFJ_A',
  ISFJ_T = 'ISFJ_T',
  ESTJ_A = 'ESTJ_A',
  ESTJ_T = 'ESTJ_T',
  ESFJ_A = 'ESFJ_A',
  ESFJ_T = 'ESFJ_T',
  ISTP_A = 'ISTP_A',
  ISTP_T = 'ISTP_T',
  ISFP_A = 'ISFP_A',
  ISFP_T = 'ISFP_T',
  ESTP_A = 'ESTP_A',
  ESTP_T = 'ESTP_T',
  ESFP_A = 'ESFP_A',
  ESFP_T = 'ESFP_T',
}

export enum SOCIAL_MEDIA_PLATFORMS {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  SNAPCHAT = 'snapchat',
  EMAIL = 'email',
  OTHER = 'other',
}

export enum VOLUNTEER_TYPE {
    ADHOC = 'ad-hoc',
    COMMITED = 'committed',
    ADMIN = 'admin'
}

export type VolunteerData = {
  _id: string;

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
  volunteerRemarks: string;
  administratorRemarks: string;

  // Event count
  volunteeringSessionsCount: number;
  workshopsCount: number;
  hangoutsCount: number;

  // Record of past events
  pastEventIds: Array<string>;

  // Record of commitment applications
  commitmentApplicationIds: Array<string>;

  createdAt: Date; // used for member since
};
