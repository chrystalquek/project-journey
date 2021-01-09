import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateCommitmentApplicationRequest, QueryParams } from '@utils/api/request';
import { GetCommitmentApplicationResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';
import { CommitmentApplicationData } from '@type/commitmentApplication';

export const createCommitmentApplication = createAsyncThunk<CommitmentApplicationData, CreateCommitmentApplicationRequest, { state }>(
  'commitmentApplication/createCommitmentApplication',
  async (data: CreateCommitmentApplicationRequest) => {
    const response = await apiClient.createCommitmentApplication(data);
    console.log("CREATED")
    console.log(response)
    return response
  }
)

export const getCommitmentApplications = createAsyncThunk<GetCommitmentApplicationResponse, QueryParams, { state }>(
  'commitmentApplication/getCommitmentApplication',
  async ({ status }) => {
    const response = await apiClient.getCommitmentApplications({ status });
    return response;
  },
);

export const updateCommitmentApplication = createAsyncThunk<CommitmentApplicationData, CommitmentApplicationData, { state }>(
  'commitmentApplication/updateCommitmentApplication',
  async (data: CommitmentApplicationData) => {
    await apiClient.updateCommitmentApplication(data);
    return data;
  },
);

