import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@api/apiClient";

export const getPendingVolunteers = createAsyncThunk(
  "common/pendingRequestsTabs/getPendingVolunteers",
  async () => {
    const response = await apiClient.getPendingVolunteers();
    return response;
  }
);

export const getPendingSignUps = createAsyncThunk(
  "common/pendingRequestsTabs/getPendingSignUps",
  async () => {
    const response = await apiClient.getPendingSignUps();
    return response;
  }
);
