import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateSignUpRequest, SignUpQueryParams, UpdateSignUpRequest,
} from '@api/request';
import { GetSignUpsResponse } from '@api/response';
import apiClient from '@api/apiClient';
import { FormState } from '@components/event/EventDetails/EventDetailsParts/EventRegisterForm';
import { SignUpData } from '@type/signUp';

export const getSignUpsUpcomingEvent = createAsyncThunk<GetSignUpsResponse, SignUpQueryParams, { state }>(
  'signUp/getSignUpsUpcomingEvent',
  async ({ id, idType }) => {
    const response = await apiClient.getSignUps({ id, idType });
    return response;
  },
);

export const getPendingSignUps = createAsyncThunk<GetSignUpsResponse, void, { state }>(
  'signUp/getPendingSignUps',
  async () => {
    const response = await apiClient.getPendingSignUps();
    return response;
  },
);

export const createAndAcceptSignUp = createAsyncThunk(
  'signUp/createAndAcceptSignUp',
  async (payloadCreator: { request: CreateSignUpRequest, form: FormState }, thunkAPI) => await apiClient.createAndUpdateSignUp(payloadCreator.form.firstChoice, payloadCreator.request),
);

export const getSignUps = createAsyncThunk(
  'signUp/getSignUps',
  async (query: SignUpQueryParams) => await apiClient.getSignUps(query),
);

export const createSignUp = createAsyncThunk(
  'signUp/createSignUp',
  async (request: CreateSignUpRequest, thunkAPI) => await apiClient.createSignUp(request),
);

export const updateSignUp = createAsyncThunk(
  'signUp/updateSignUp',
  async (payloadCreator: { query: SignUpQueryParams, request: UpdateSignUpRequest }) => await apiClient.updateSignUp(payloadCreator.query, payloadCreator.request),
);

export const updateSignUpInstant = createAsyncThunk(
  'signUp/updateSignUpInstant',
  async (payloadCreator: { query: SignUpQueryParams, request: SignUpData }) => {
    await apiClient
      .updateSignUp(payloadCreator.query, payloadCreator.request);
    const response = {
      data: [payloadCreator.request],
    };
    return response;
  },
);

export const deleteSignUp = createAsyncThunk(
  'signUp/deleteSignUp',
  async (query: SignUpQueryParams) => await apiClient.deleteSignUp(query),
);
