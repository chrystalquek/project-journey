import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';
import { LoginRequest } from '../api/request';
import { LoginResponse } from '../api/response';

export type LoginArgs = {
  email: string,
  password: string
}

const login = createAsyncThunk<LoginResponse, LoginArgs, { state }>(
  'user/login',
  async ({ email, password }) => {
    const request: LoginRequest = {
      email,
      password,
    };

    const response = await apiClient.login(request) as LoginResponse;
    return response;
  },
);

export default login;
