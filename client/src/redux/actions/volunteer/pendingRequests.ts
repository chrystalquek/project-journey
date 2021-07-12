import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@api/apiClient";
import { UpdateCommitmentApplicationRequest } from "@api/request";
import { CommitmentApplicationStatus } from "@type/commitmentApplication";

export const getPendingVolunteers = createAsyncThunk(
  "volunteer/pendingRequests/getPendingVolunteers",
  async () => {
    const response = await apiClient.getPendingVolunteers();
    return response;
  }
);

export const getPendingCommitmentApplications = createAsyncThunk(
  "volunteer/pendingRequests/getPendingCommitmentApplication",
  async () => {
    const response = await apiClient.getCommitmentApplications({
      status: CommitmentApplicationStatus.Pending,
    });
    return response;
  }
);

export const updateCommitmentApplication = createAsyncThunk(
  "volunteer/pendingRequests/updateCommitmentApplication",
  async (request: UpdateCommitmentApplicationRequest) => {
    const response = await apiClient.updateCommitmentApplication(request);
    return response;
  }
);
