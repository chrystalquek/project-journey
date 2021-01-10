import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommitmentApplicationQueryParams } from '@utils/api/request';
import { GetCommitmentApplicationResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';
import { CommitmentApplicationData } from '@type/commitmentApplication';

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

