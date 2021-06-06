import { createAsyncThunk } from '@reduxjs/toolkit';
import { VolunteerData } from '@type/volunteer';
import apiClient from '@api/apiClient';

export const getVolunteerById = createAsyncThunk<VolunteerData, string, { state }>(
  'profilePageData/getVolunteerById',
  async (id: string) => {
    const response = await apiClient.getVolunteerById(id);
    return response;
  },
);
