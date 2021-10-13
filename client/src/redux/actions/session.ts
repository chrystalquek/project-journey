import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateVolunteerRequest, LoginRequest } from "@api/request";
import apiClient from "@api/apiClient";

export const signUp = createAsyncThunk(
  "user/signUp",
  async (request: CreateVolunteerRequest) => {
    const response = apiClient.createVolunteer(request);
    return response;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (request: LoginRequest) => {
    const response = await apiClient.login(request);
    return response;
  }
);
