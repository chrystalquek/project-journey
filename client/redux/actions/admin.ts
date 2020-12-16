import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from "@utils/api/apiClient";

const getAdminEvents = createAsyncThunk(
  'admin/getEvents',
  async () => {
    const response = await apiClient.getAllEvents();
    return response;
  }
);

export { getAdminEvents };