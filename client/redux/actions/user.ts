import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignUpRequest, LoginRequest } from '@utils/api/request';
import { SignUpResponse, LoginResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';
import { VolunteerData } from '@type/volunteer';

export type SignUpArgs = {
  name: string
  email: string
  password: string
  gender: string
  citizenship: string
  race: string
  hasVolunteered: boolean
  hasChildrenExperience: boolean
  hasExternalVolunteerExperience: boolean
  hasFirstAidCertification: boolean
  volunteerFrequency: number
  volunteerReason: string
  volunteerContribution: string
  birthday: Date
  volunteerType: string
}

export type LoginArgs = {
  email: string,
  password: string
}

export const signUp = createAsyncThunk<SignUpResponse, SignUpArgs, { state }>(
  'volunteer/',
  async ({
    name, email, password, gender, citizenship, race, hasVolunteered, hasChildrenExperience, hasExternalVolunteerExperience, hasFirstAidCertification, volunteerFrequency, volunteerReason, volunteerContribution, birthday, volunteerType,
  }) => {
    const request: SignUpRequest = {
      name,
      email,
      password,
      gender,
      citizenship,
      race,
      hasVolunteered,
      hasChildrenExperience,
      hasExternalVolunteerExperience,
      hasFirstAidCertification,
      volunteerFrequency,
      volunteerReason,
      volunteerContribution,
      birthday,
      volunteerType,
    };

    const response = await apiClient.signUp(request) as SignUpResponse;
    return response;
  },
);

const login = createAsyncThunk<LoginResponse, LoginArgs, { state }>(
  'user/login',
  async ({ email, password }) => {
    const request: LoginRequest = {
      email,
      password,
    };
    const response = await apiClient.login(request) as LoginResponse;
    return response;
  },
);

type UpdateVolunteerArgs = {
  email: string, 
  updatedVolunteerData: Partial<VolunteerData>
}

export const updateVolunteer = createAsyncThunk<VolunteerData, UpdateVolunteerArgs>(
  'user/updateVolunteer',
  async ({ email, updatedVolunteerData }) => {
    const request = {
      email,
      updatedVolunteerData
    }

    const response = await apiClient.updateVolunteer(request);
    return response
  }
)

export default login;
