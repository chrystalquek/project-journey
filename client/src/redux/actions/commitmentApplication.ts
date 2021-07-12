import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateCommitmentApplicationRequest,
  UpdateCommitmentApplicationRequest,
} from "@api/request";
import apiClient from "@api/apiClient";

export const createCommitmentApplication = createAsyncThunk(
  "commitmentApplication/createCommitmentApplication",
  async (request: CreateCommitmentApplicationRequest) => {
    const response = await apiClient.createCommitmentApplication(request);
    return response;
  }
);

export const updateCommitmentApplication = createAsyncThunk(
  "commitmentApplication/updateCommitmentApplication",
  async (request: UpdateCommitmentApplicationRequest) => {
    const response = await apiClient.updateCommitmentApplication(request);
    return response;
  }
);
