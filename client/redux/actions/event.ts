import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateEventRequest, QueryParams } from '@utils/api/request';
import { CreateEventResponse, GetEventsResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';

export const getSignedUpEventsUpcomingEvent = createAsyncThunk<GetEventsResponse, QueryParams, { state }>(
  'event/getSignedUpEventsUpcomingEvent',
  async ({ userId, eventType }) => {
    const response = await apiClient.getSignedUpEvents({ userId, eventType })
    return response;
  }
)

export const getEventsUpcomingEvent = createAsyncThunk<GetEventsResponse, QueryParams, { state }>(
  'event/getEventsUpcomingEvent',
  async ({ eventType }) => {
    const response = await apiClient.getEvents({ eventType })
    return response;
  }
)

export const createEvent = createAsyncThunk<CreateEventResponse, CreateEventRequest, { state }>(
  'event',
  async (data: CreateEventRequest) => {
    const response = await apiClient.createEvent(data) as CreateEventResponse;
    return response;
  },
);

export default createEvent;
