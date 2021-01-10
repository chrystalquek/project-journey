import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignUpQueryParams } from '@utils/api/request';
import { GetSignUpsResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';

export const getSignUpsUpcomingEvent = createAsyncThunk<GetSignUpsResponse, SignUpQueryParams, { state }>(
  'signUp/getSignUpsUpcomingEvent',
  async ({ id, idType }) => {
    const response = await apiClient.getSignUps({ id, idType });
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
