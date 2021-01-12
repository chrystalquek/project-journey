import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParams, UpdateSignUpRequest } from '@utils/api/request';
import { GetSignUpsResponse, UpdateSignUpResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';

export const getSignUpsUpcomingEvent = createAsyncThunk<GetSignUpsResponse, QueryParams, { state }>(
  'signUp/getSignUpsUpcomingEvent',
  async ({ id, idType }) => {
    const response = await apiClient.getSignUps({ id, idType });
    return response;
  },
);

export const updateSignUp = createAsyncThunk<UpdateSignUpResponse, UpdateSignUpRequest, { state }>(
  'signUp/updateSignUp',
  async (data) => {
    const response = await apiClient.getSignUps(data);
    return response;
  },
);

export const getPendingSignUps = createAsyncThunk<GetSignUpsResponse, void, { state }>(
  'signUp/getPendingSignUps',
  async () => {
    const response = await apiClient.getPendingSignUps();
    return response;
  },
);
