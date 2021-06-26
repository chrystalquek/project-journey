import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@api/apiClient";
import { GetVolunteersByIdRequest } from "@api/request";

export const getPendingVolunteers = createAsyncThunk(
  "volunteer/getPendingVolunteers",
  async () => {
    const response = await apiClient.getPendingVolunteers();
    return response;
  }
);

export const getVolunteersById = createAsyncThunk(
  "volunteer/getVolunteersById",
  async (request: GetVolunteersByIdRequest) => {
    const response = await apiClient.getVolunteersById(request);
    return response;
  }
);
