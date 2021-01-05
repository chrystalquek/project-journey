import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParams } from '@utils/api/request';
import { GetCommitmentApplicationResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';
import { CommitmentApplicationData } from '@type/commitmentApplication';

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
    const response = await apiClient.updateCommitmentApplication(data);
    return data; // TODO is server supposed to return updated commitment application?
  },
);

