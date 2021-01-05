import { rowsPerPage } from '@components/volunteer/VolunteerProfile';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParams } from '@utils/api/request';
import { convertFilterObjectToQueryString } from '@utils/helpers/TableOptions';
import { GetVolunteersPaginatedResponse, GetVolunteersResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';

export const getVolunteersVolunteerProfile = createAsyncThunk<GetVolunteersPaginatedResponse, QueryParams, { state }>(
  'volunteer/getVolunteersVolunteerProfile',
  async ({ pageNo, size, volunteerType }) => {
    const response = await apiClient.getVolunteers({ pageNo: pageNo || 0, size: size || rowsPerPage, volunteerType: convertFilterObjectToQueryString(volunteerType) }); // fill in default values if necessary
    return { ...response, pageNo: pageNo || 0, filters: { volunteerType } };
  },
);

export const getPendingVolunteers = createAsyncThunk<GetVolunteersResponse, void, { state }>(
  'volunteer/getPendingVolunteers',
  async () => {
    const response = await apiClient.getPendingVolunteers();
    return response;
  }
)
