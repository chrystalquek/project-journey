import apiClient from "@api/apiClient";
import {
  GetVolunteersByIdRequest,
  GetVolunteersPaginatedRequest,
  UpdateVolunteerRequest,
} from "@api/request";
import { GetVolunteersPaginatedResponse } from "@api/response";
import { StoreState } from "@redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
// functions

// only need to define generics if need to use getState
// define generics for createAsyncThunk: return type, parameters and empty object: https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
export const listVolunteers = createAsyncThunk<
  GetVolunteersPaginatedResponse,
  GetVolunteersPaginatedRequest,
  { state: StoreState }
>("volunteer/listVolunteers", async (args) => apiClient.getVolunteers(args));

export const getVolunteer = createAsyncThunk(
  "volunteer/getVolunteer",
  async (_id: string) => {
    const response = await apiClient.getVolunteer({ _id });
    return response;
  }
);

export const updateVolunteer = createAsyncThunk(
  "volunteer/updateVolunteer",
  async (request: UpdateVolunteerRequest) => {
    const response = await apiClient.updateVolunteer(request);
    return response;
  }
);

export const getVolunteersById = createAsyncThunk(
  "volunteer/getVolunteersById",
  async (request: GetVolunteersByIdRequest) => {
    const response = await apiClient.getVolunteersById(request);
    return response;
  }
);
