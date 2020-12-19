import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@utils/api/apiClient';

const getAllVolunteers = createAsyncThunk(
  'volunteer/getAll',
  async () => {
    const response = await apiClient.getAllVolunteers();
    return response;
  },
);

export default getAllVolunteers;
