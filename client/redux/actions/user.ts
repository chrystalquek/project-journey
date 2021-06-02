import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignUpRequest, LoginRequest } from 'api/request';
import { SignUpResponse, LoginResponse } from 'api/response';
import apiClient from 'api/apiClient';
import {
  VolunteerData,
} from '@type/volunteer';

export type LoginArgs = {
  email: string;
  password: string;
};

export const signUp = createAsyncThunk<SignUpResponse, VolunteerData, { state }>(
  'volunteer/',
  async (volunteer) => {
    const response = apiClient.signUp(volunteer);
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
    const response = (await apiClient.login(request)) as LoginResponse;
    return response;
  },
);

type UpdateVolunteerArgs = {
  id: string;
  updatedVolunteerData: Partial<VolunteerData>;
};

export const updateVolunteer = createAsyncThunk<
  VolunteerData,
  UpdateVolunteerArgs
>('user/updateVolunteer', async ({ id, updatedVolunteerData }) => {
  const request = {
    id,
    updatedVolunteerData,
  };

  const response = await apiClient.updateVolunteer(request);
  return response;
});

export default login;
