import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateVolunteerRequest, LoginRequest } from "@api/request";
import apiClient from "@api/apiClient";

export type LoginArgs = {
  email: string;
  password: string;
};

export const signUp = createAsyncThunk(
  "volunteer/",
  async (request: CreateVolunteerRequest) => {
    const response = apiClient.createVolunteer(request);
    return response;
  }
);

const login = createAsyncThunk("user/login", async (request: LoginRequest) => {
  const response = await apiClient.login(request);
  return response;
});

export default login;
