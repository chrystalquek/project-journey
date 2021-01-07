import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParams } from '@utils/api/request';
import { GetCountResponse, GetSignUpsResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';

export const getSignUpsUpcomingEvent = createAsyncThunk<GetSignUpsResponse, QueryParams, { state }>(
  'signUp/getSignUpsUpcomingEvent',
  async ({ id, idType }) => {
    const response = await apiClient.getSignUps({ id, idType });
    return response;
  },
);

export const getPendingSignUpsPendingApproval = createAsyncThunk<GetCountResponse, void, { state }>(
  'signUp/getPendingSignUpsPendingApproval',
  async () => {
    const response = await apiClient.getPendingSignUps();
    return response;
  },
);
