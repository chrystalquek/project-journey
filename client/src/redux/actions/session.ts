import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateVolunteerRequest,
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  UpdateVolunteerRequest,
} from "@api/request";
import apiClient from "@api/apiClient";

export type LoginArgs = {
  email: string;
  password: string;
};

export type ForgotPasswordArgs = {
  email: string;
};

export type ResetPasswordArgs = {
  token: string;
  newPassword: string;
};

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

export const forgotPassword = createAsyncThunk(
  "email/forgot-password",
  async (request: ForgotPasswordRequest) => {
    const response = await apiClient.sendForgotPassword(request);
    return response;
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password/",
  async (request: ResetPasswordRequest) => {
    const response = await apiClient.resetPassword(request);
    return response;
  }
);

export const updateVolunteer = createAsyncThunk(
  "user/updateVolunteer",
  async (request: UpdateVolunteerRequest) => {
    const response = await apiClient.updateVolunteer(request);
    return response;
  }
);
