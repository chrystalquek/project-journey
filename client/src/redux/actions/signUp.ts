import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateSignUpRequest,
  DeleteSignUpRequest,
  GetSignUpsRequest,
  UpdateSignUpRequest,
} from "@api/request";
import apiClient from "@api/apiClient";
import { FormState } from "@components/event/EventDetails/EventRegisterForm";

export const createSignUp = createAsyncThunk(
  "signUp/createSignUp",
  async (request: CreateSignUpRequest) => {
    const response = await apiClient.createSignUp(request);
    return response;
  }
);

export const getSignUps = createAsyncThunk(
  "signUp/getSignUps",
  async (request: GetSignUpsRequest) => {
    const response = await apiClient.getSignUps(request);
    return response;
  }
);

export const getPendingSignUps = createAsyncThunk(
  "events/getPendingSignUps",
  async () => {
    const response = await apiClient.getPendingSignUps();
    return response;
  }
);

export const updateSignUp = createAsyncThunk(
  "signUp/updateSignUp",
  async (request: UpdateSignUpRequest) => {
    const response = await apiClient.updateSignUp(request);
    return response;
  }
);

export const createAndAcceptSignUp = createAsyncThunk(
  "signUp/createAndAcceptSignUp",
  async (payloadCreator: { request: CreateSignUpRequest; form: FormState }) =>
    apiClient.createAndUpdateSignUp(
      payloadCreator.form.firstChoice,
      payloadCreator.request
    )
);

export const deleteSignUp = createAsyncThunk(
  "signUp/deleteSignUp",
  async (query: DeleteSignUpRequest) => {
    const response = await apiClient.deleteSignUp(query);
    return response;
  }
);
