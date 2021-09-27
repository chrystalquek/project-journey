import apiClient from "@api/apiClient";
import {
  GetVolunteersByIdRequest,
  GetVolunteersPaginatedRequest,
  UpdateCommitmentApplicationRequest,
  UpdateVolunteerRequest,
} from "@api/request";
import { GetVolunteersPaginatedResponse } from "@api/response";
import { StoreState } from "@redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommitmentApplicationStatus } from "@type/commitmentApplication";
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

export const getPendingVolunteers = createAsyncThunk(
  "volunteer/getPendingVolunteers",
  async () => {
    const response = await apiClient.getPendingVolunteers();
    return response;
  }
);

export const getPendingCommitmentApplications = createAsyncThunk(
  "volunteer/getPendingCommitmentApplication",
  async () => {
    const response = await apiClient.getCommitmentApplications({
      status: CommitmentApplicationStatus.Pending,
    });
    return response;
  }
);

export const updateCommitmentApplication = createAsyncThunk(
  "volunteer/updateCommitmentApplication",
  async (request: UpdateCommitmentApplicationRequest) => {
    const response = await apiClient.updateCommitmentApplication(request);
    return response;
  }
);
