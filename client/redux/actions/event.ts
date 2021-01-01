import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@utils/api/apiClient';

const getAllEvents = createAsyncThunk(
  'event/getEvents',
  async () => await apiClient.getAllEvents(),
);

export { getAllEvents };
