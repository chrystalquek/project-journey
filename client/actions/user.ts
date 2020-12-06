import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

export type LoginArgs = {
  email: string,
  password: string
}

export type LoginResponse = {
  email: string
  name: string
}

const login = createAsyncThunk<LoginResponse, LoginArgs, { state }>(
  'user/login',
  async ({ email, password }) => {
    const request = {
      email,
      password,
    };

    const response = await apiClient.userLogin(request);
    return response;
  },
);

export default login;
