import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@api/apiClient";

export const getUpcomingEvents = createAsyncThunk(
  "events/pendingRequests/getUpcomingEvents",
  async () => {
    const response = await apiClient.getEvents({ eventType: "upcoming" });
    return response;
  }
);

export const getPendingSignUps = createAsyncThunk(
  "events/pendingRequests/getPendingSignUps",
  async () => {
    const response = await apiClient.getPendingSignUps();
    return response;
  }
);
