import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@api/apiClient";

export const getPendingSignUps = createAsyncThunk(
  "home/pendingApproval/getPendingSignUps",
  async () => {
    const response = await apiClient.getPendingSignUps();
    return response;
  }
);

export const getPendingVolunteers = createAsyncThunk(
  "home/pendingApproval/getPendingVolunteers",
  async () => {
    const response = await apiClient.getPendingVolunteers();
    return response;
  }
);
