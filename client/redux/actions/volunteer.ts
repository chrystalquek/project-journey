import { createAsyncThunk } from '@reduxjs/toolkit';
import { VolunteerQueryOptions } from 'api/request';
import { GetVolunteersResponse } from 'api/response';
import apiClient from '../../api/apiClient';

type GetVolunteersReturnType = { response: GetVolunteersResponse; pageNo: number; }

export const getVolunteers = createAsyncThunk<GetVolunteersReturnType, VolunteerQueryOptions, { state }>(
  'volunteer/getVolunteers',
  async ({ pageNo, size, volunteerType }) => {
    const response = await apiClient.getVolunteers({ pageNo, size, volunteerType });
    return { response, pageNo };
  },
);
