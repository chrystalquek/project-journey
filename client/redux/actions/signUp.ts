import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParams } from 'api/request';
import { GetCountResponse, GetSignUpsResponse } from 'api/response';
import apiClient from '../../api/apiClient';

export const getSignUps = createAsyncThunk<GetSignUpsResponse, QueryParams, { state }>(
  'signup/getSignUps',
  async ({ id, idType }) => {
    const response = await apiClient.getSignUps({ id, idType });
    return response;
  }
)

export const getPendingSignUps = createAsyncThunk<GetCountResponse, void, { state }>(
  'signup/getPendingSignUps',
  async () => {
    const response = await apiClient.getPendingSignUps();
    return response;
  }
)
