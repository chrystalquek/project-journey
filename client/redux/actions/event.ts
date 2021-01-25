import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateEventRequest, EditEventRequest, GetEventParams, EventQueryParams, UploadImageRequest,
} from '@utils/api/request';
import {
  CreateEventResponse, EditEventResponse, GetEventsResponse, GetEventResponse, UploadImageResponse,
} from '@utils/api/response';
import apiClient from '@utils/api/apiClient';

export const getSignedUpEventsUpcomingEvent = createAsyncThunk<GetEventsResponse,
  EventQueryParams, { state }>(
    'event/getSignedUpEventsUpcomingEvent',
    async ({ userId, eventType }) => {
      const response = await apiClient.getSignedUpEvents({ userId, eventType });
      return response;
    },
  );

export const getEventsUpcomingEvent = createAsyncThunk<GetEventsResponse, EventQueryParams, { state }>(
  'event/getEventsUpcomingEvent',
  async ({ eventType }) => {
    const response = await apiClient.getEvents({ eventType });
    return response;
  },
);

export const createEvent = createAsyncThunk<CreateEventResponse, CreateEventRequest, { state }>(
  'event/createEvent',
  async (data: CreateEventRequest) => {
    const response = await apiClient.createEvent(data) as CreateEventResponse;
    return response;
  },
);

export const editEvent = createAsyncThunk<EditEventResponse, EditEventRequest, { state }>(
  'event/editEvent',
  async (request: EditEventRequest) => {
    const response = await apiClient.editEvent(request) as EditEventResponse;
    return response;
  },
);

export const getEvent = createAsyncThunk<GetEventResponse, GetEventParams, { state }>(
  'event/getEvent',
  async (params: GetEventParams) => {
    const response = await apiClient.getEvent(params) as GetEventResponse;
    return response;
  },
);

export const getUpcomingEvents = createAsyncThunk(
  'event/getEvents',
  async () => await apiClient.getEvents({ eventType: 'upcoming' }),
);

export default {
  createEvent, editEvent, getEvent, getUpcomingEvents: getUpcomingEvents,
};
