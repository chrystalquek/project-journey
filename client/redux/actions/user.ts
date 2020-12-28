import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignupRequest, LoginRequest } from '@utils/api/request';
import { SignupResponse, LoginResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';

export type SignupArgs = {
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
}

export type LoginArgs = {
  email: string,
  password: string
}

export const signup = createAsyncThunk<SignupResponse, SignupArgs, { state }>(
  'volunteer/',
  async ({ name, email, password, gender, citizenship, race,hasVolunteered, hasChildrenExperience, hasExternalVolunteerExperience,hasFirstAidCertification, volunteerFrequency, volunteerReason,volunteerContribution, birthday }) => {
    const request: SignupRequest = {
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
      birthday
    };

    const response = await apiClient.signup(request) as SignupResponse;
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
    localStorage.setItem("token", JSON.stringify(response.token))
    return response;
  },
);

export default login;
