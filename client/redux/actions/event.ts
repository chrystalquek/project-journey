import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateEventRequest, EditEventRequest, GetEventParams } from '@utils/api/request';
import { CreateEventResponse, EditEventResponse, GetEventResponse } from '@utils/api/response';

import apiClient from '@utils/api/apiClient';

export const createEvent = createAsyncThunk<CreateEventResponse, CreateEventRequest, {state}>(
  'event/createEvent',
  async (data: CreateEventRequest) => {
    const response = await apiClient.createEvent(data) as CreateEventResponse;
    return response;
  },
);

export const editEvent = createAsyncThunk<EditEventResponse, EditEventRequest, {state}>(
  'event/editEvent',
  async (data: EditEventRequest) => {
    const response = await apiClient.editEvent(data) as EditEventResponse;
    return response;
  },
);

export const getEvent = createAsyncThunk<GetEventResponse, GetEventParams, {state}>(
  'event/getEvent',
  async (params: GetEventParams) => {
    const response = await apiClient.getEvent(params) as GetEventResponse;
    return response;
  },
);

export default { createEvent, editEvent, getEvent };
