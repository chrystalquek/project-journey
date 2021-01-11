import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParams } from '@utils/api/request';
import { GetSignUpsResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';

export const getSignUpsUpcomingEvent = createAsyncThunk<GetSignUpsResponse, QueryParams, { state }>(
  'signUp/getSignUpsUpcomingEvent',
  async ({ id, idType }) => {
    const response = await apiClient.getSignUps({ id, idType });
    return response;
  },
);

export const updateSignUp = createAsyncThunk<any, any, { state }>(
  'signUp/updateSignUp',
  async ({ signUpId, data }) => {
    const response = await apiClient.getSignUps({ signUpId, data });
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
