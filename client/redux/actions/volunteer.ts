import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetVolunteersResponse } from '@api/response';
import apiClient from '@api/apiClient';

export const getPendingVolunteers = createAsyncThunk<GetVolunteersResponse, void, { state }>(
  'volunteer/getPendingVolunteers',
  async () => {
    const response = await apiClient.getPendingVolunteers();
    return response;
  },
);

export const getVolunteersById = createAsyncThunk<GetVolunteersResponse, any, { state }>(
  'volunteer/getVolunteersById',
  async (ids) => {
    const response = await apiClient.getVolunteersById(ids);
    return response;
  },
);
