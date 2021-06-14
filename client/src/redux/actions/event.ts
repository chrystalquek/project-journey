import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@api/apiClient';
import {
  CreateEventRequest, GetEventsRequest, GetSignedUpEventsRequest, UpdateEventRequest,
} from '@api/request';

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (request: CreateEventRequest) => {
    // TODO change this to 1 api call
    const response = await apiClient.createEvent(request);
    await apiClient.createForm({ eventId: response._id, questions: request.questions });
    return response;
  },
);

export const getEventsUpcomingEvent = createAsyncThunk(
  'event/getEventsUpcomingEvent',
  async (request: GetEventsRequest) => {
    const response = await apiClient.getEvents(request);
    return response;
  },
);

export const getUpcomingEvents = createAsyncThunk(
  'event/getEvents',
  async () => apiClient.getEvents({ eventType: 'upcoming' }),
);

export const getSignedUpEventsUpcomingEvent = createAsyncThunk(
  'event/getSignedUpEventsUpcomingEvent',
  async (request: GetSignedUpEventsRequest) => {
    const response = await apiClient.getSignedUpEvents(request);
    return response;
  },
);

export const getSignedUpEventsPastEvent = createAsyncThunk(
  'event/getSignedUpEventsPastEvent',
  async (request: GetSignedUpEventsRequest) => {
    const response = await apiClient.getSignedUpEvents(request);
    return response;
  },
);

export const getEvent = createAsyncThunk(
  'event/getEvent',
  async (_id: string) => {
    const response = await apiClient.getEvent({ _id });
    return response;
  },
);

export const editEvent = createAsyncThunk(
  'event/editEvent',
  async (request: UpdateEventRequest) => {
    const response = await apiClient.updateEvent(request);
    return response;
  },
);

export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async (_id: string) => {
    await apiClient.deleteEvent({ _id });
  },
);

export const cancelEvent = createAsyncThunk(
  'event/cancelEvent',
  async (_id: string) => {
    await apiClient.cancelEvent({ _id });
  },
);

export default {
  createEvent, editEvent, getEvent, getUpcomingEvents,
};
