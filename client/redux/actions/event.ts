import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateEventRequest } from '@utils/api/request';
import { CreateEventResponse } from '@utils/api/response';

import apiClient from '@utils/api/apiClient';

export const createEvent = createAsyncThunk<CreateEventResponse, CreateEventRequest, {state}>(
  'event',
  async (data: CreateEventRequest) => {
    const response = await apiClient.createEvent(data) as CreateEventResponse;
    return response;
  },
);

export default createEvent;
