import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParams } from 'api/request';
import { GetEventsResponse } from 'api/response';
import apiClient from '../../api/apiClient';

export const getSignedUpEvents = createAsyncThunk<GetEventsResponse, QueryParams, { state }>(
  'event/getSignedUpEvents',
  async ({ userId, eventType }) => {
    const response = await apiClient.getSignedUpEvents({ userId, eventType })
    return response;
  }
)

export const getEvents = createAsyncThunk<GetEventsResponse, QueryParams, { state }>(
  'event/getEvents',
  async ({ eventType }) => {
    const response = await apiClient.getEvents({ eventType })
    return response;
  }
)
