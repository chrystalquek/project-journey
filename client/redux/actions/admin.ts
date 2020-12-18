import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from "@utils/api/apiClient";

const getAdminEvents = createAsyncThunk(
  'admin/getEvents',
  async () => {
    return await apiClient.getAllEvents();;
  }
);

export { getAdminEvents };