import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignUpRequest, LoginRequest } from '@utils/api/request';
import { SignUpResponse, LoginResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';
import {
  VOLUNTEER_TYPE,
  GENDER,
  CITIZENSHIP,
  SOCIAL_MEDIA_PLATFORMS,
  RACE,
  VolunteerData,
} from '@type/volunteer';

export type SignUpArgs = {
  name: string;
  password?: string;

  volunteerType: VOLUNTEER_TYPE;

  nickname: string;
  gender: GENDER;
  citizenship: CITIZENSHIP;
  birthday: Date;
  address?: string;
  mobileNumber: string;
  photoUrl: string;
  email: string;
  description?: string;

  socialMediaPlatform?: SOCIAL_MEDIA_PLATFORMS;
  instagramHandle?: string;

  organization?: string;
  position?: string;
  race?: RACE;

  languages: Array<string>; // Clarify
  referralSources: Array<string>;

  hasVolunteered: boolean;
  biabVolunteeringDuration?: number; // Number of months

  hasVolunteeredExternally?: boolean;
  volunteeringExperience?: string;

  hasChildrenExperience?: boolean;
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

export type LoginArgs = {
  email: string;
  password: string;
};

export const signUp = createAsyncThunk<SignUpResponse, SignUpArgs, { state }>(
  'volunteer/',
  async ({
    name,
    password,
    volunteerType,
    nickname,
    gender,
    citizenship,
    birthday,
    address,
    mobileNumber,
    photoUrl,
    email,
    description,

    socialMediaPlatform,
    instagramHandle,

    organization,
    position,
    race,

    languages,
    referralSources,

    hasVolunteered,
    biabVolunteeringDuration,

    hasVolunteeredExternally,
    volunteeringExperience,

    hasChildrenExperience,
    childrenExperience,

    sessionsPerMonth,
    sessionPreference,

    hasFirstAidCertification,
    leadershipInterest,
    interests, // short-ans

    skills,

    personality, // Myers-Briggs
    strengths,
    volunteeringOpportunityInterest,

    volunteerReason, // Essay
    volunteerContribution,

    // WCA Registration: Medical Information
    hasMedicalNeeds,
    medicalNeeds,
    hasAllergies,
    allergies,
    hasMedicationDuringDay,

    // WCA Registration: Emergency Contact
    emergencyContactName,
    emergencyContactNumber,
    emergencyContactEmail,
    emergencyContactRelationship,
  }) => {
    const request: SignUpRequest = {
      name,
      password,
      volunteerType,
      nickname,
      gender,
      citizenship,
      birthday,
      address,
      mobileNumber,
      photoUrl,
      email,
      description,

      socialMediaPlatform,
      instagramHandle,

      organization,
      position,
      race,

      languages,
      referralSources,

      hasVolunteered,
      biabVolunteeringDuration,

      hasVolunteeredExternally,
      volunteeringExperience,

      hasChildrenExperience,
      childrenExperience,

      sessionsPerMonth,
      sessionPreference,

      hasFirstAidCertification,
      leadershipInterest,
      interests, // short-ans

      skills,

      personality, // Myers-Briggs
      strengths,
      volunteeringOpportunityInterest,

      volunteerReason, // Essay
      volunteerContribution,

      // WCA Registration: Medical Information
      hasMedicalNeeds,
      medicalNeeds,
      hasAllergies,
      allergies,
      hasMedicationDuringDay,

      // WCA Registration: Emergency Contact
      emergencyContactName,
      emergencyContactNumber,
      emergencyContactEmail,
      emergencyContactRelationship,
    };

    const response = (await apiClient.signUp(request)) as SignUpResponse;
    return response;
  }
);

const login = createAsyncThunk<LoginResponse, LoginArgs, { state }>(
  'user/login',
  async ({ email, password }) => {
    const request: LoginRequest = {
      email,
      password,
    };
    const response = (await apiClient.login(request)) as LoginResponse;
    return response;
  }
);

type UpdateVolunteerArgs = {
  email: string;
  updatedVolunteerData: Partial<VolunteerData>;
};

export const updateVolunteer = createAsyncThunk<
  VolunteerData,
  UpdateVolunteerArgs
>('user/updateVolunteer', async ({ email, updatedVolunteerData }) => {
  const request = {
    email,
    updatedVolunteerData,
  };

  const response = await apiClient.updateVolunteer(request);
  return response;
});

export default login;
