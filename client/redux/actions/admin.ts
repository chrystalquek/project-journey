import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@utils/api/apiClient';

const getAdminEvents = createAsyncThunk(
  'admin/getEvents',
  async () => await apiClient.getAllEvents(),
);

export { getAdminEvents };
