import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryOptions } from 'api/request';
import { GetVolunteersResponse } from 'api/response';
import apiClient from '../../api/apiClient';

type GetVolunteersReturnType = { response: GetVolunteersResponse; pageNo: number; }

export const getVolunteers = createAsyncThunk<GetVolunteersReturnType, QueryOptions, { state }>(
  'volunteer/getVolunteers',
  async ({ pageNo, size }) => {
    const response = await apiClient.getVolunteers({ pageNo, size });
    return { response, pageNo };
  },
);
