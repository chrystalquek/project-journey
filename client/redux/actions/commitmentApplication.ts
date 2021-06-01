import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateCommitmentApplicationRequest, CommitmentApplicationQueryParams } from 'api/request';
import { GetCommitmentApplicationResponse } from 'api/response';
import apiClient from 'api/apiClient';
import { CommitmentApplicationData } from '@type/commitmentApplication';

export const createCommitmentApplication = createAsyncThunk<CommitmentApplicationData, CreateCommitmentApplicationRequest, { state }>(
  'commitmentApplication/createCommitmentApplication',
  async (data: CreateCommitmentApplicationRequest) => {
    const response = await apiClient.createCommitmentApplication(data);
    return response;
  },
);

export const getCommitmentApplications = createAsyncThunk<GetCommitmentApplicationResponse, CommitmentApplicationQueryParams, { state }>(
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
