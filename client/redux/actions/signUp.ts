import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateSignUpRequest, SignUpQueryParams, UpdateSignUpRequest } from '@utils/api/request';
import { GetSignUpsResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';
import { SignUpIdType } from '@type/signUp';
import { FormState } from '@components/event/EventDetails/EventRegisterForm';

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
  async (payloadCreator: { request: CreateSignUpRequest, form: FormState }, thunkAPI) => {
    // TODO: snake case issues
    const res = await apiClient.createSignUp(payloadCreator.request);
    const query = { id: res['sign-up-id'], idType: 'signUpId' as SignUpIdType };
    const newReq: UpdateSignUpRequest = {
      ...payloadCreator.request,
      status: ['accepted', payloadCreator.form.firstChoice],
    };
    return await apiClient.updateSignUp(query, newReq);
  },
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
