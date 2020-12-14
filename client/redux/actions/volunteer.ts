import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

const getAllVolunteers = createAsyncThunk(
  'volunteer',
  async () => {
    const response = await apiClient.getAllVolunteers();
    return response;
  },
);

export default getAllVolunteers;
