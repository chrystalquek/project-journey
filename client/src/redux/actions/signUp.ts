import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateSignUpRequest,
  DeleteSignUpRequest,
  GetSignUpsRequest,
  UpdateSignUpRequest,
} from "@api/request";
import apiClient from "@api/apiClient";
import { FormState } from "@components/event/EventDetails/EventDetailsParts/EventRegisterForm";

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

export const getSignUpsUpcomingEvent = createAsyncThunk(
  "signUp/getSignUpsUpcomingEvent",
  async (request: GetSignUpsRequest) => {
    const response = await apiClient.getSignUps(request);
    return response;
  }
);

// TODO what are these 2 below
export const updateSignUpInstant = createAsyncThunk(
  "signUp/updateSignUpInstant",
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
