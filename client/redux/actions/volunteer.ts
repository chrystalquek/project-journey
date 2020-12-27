import { rowsPerPage } from '@components/volunteer/VolunteerProfile';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { convertFilterObjectToQueryString } from '@utils/helpers/TableOptions';
import { QueryParams } from 'api/request';
import { GetCountResponse, GetVolunteersResponse } from 'api/response';
import apiClient from '../../api/apiClient';

export const getVolunteers = createAsyncThunk<GetVolunteersResponse, QueryParams, { state }>(
  'volunteer/getVolunteers',
  async ({ pageNo, size, volunteerType }) => {
    const response = await apiClient.getVolunteers({ pageNo: pageNo || 0, size: size || rowsPerPage, volunteerType: convertFilterObjectToQueryString(volunteerType) }); // fill in default values if necessary
    return { ...response, pageNo: pageNo || 0, filters: { volunteerType } };
  },
);

export const getPendingVolunteers = createAsyncThunk<GetCountResponse, void, { state }>(
  'volunteer/getPendingVolunteers',
  async () => {
    const response = await apiClient.getPendingVolunteers();
    return response;
  }
)
