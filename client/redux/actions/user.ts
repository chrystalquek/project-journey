import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequest } from '@utils/api/request';
import { LoginResponse } from '@utils/api/response';
import apiClient from '../../utils/api/apiClient';

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
