import { rowsPerPage } from '@components/volunteer/VolunteerProfile';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { VolunteerPaginatedQueryParams } from '@utils/api/request';
import { GetVolunteersPaginatedResponse, GetVolunteersResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';
import { convertFilterObjectToQueryString } from '@utils/helpers/TableOptions';
import { VolunteersMetaArgs } from '@redux/reducers/volunteer';

export const getVolunteersVolunteerProfile = createAsyncThunk<GetVolunteersPaginatedResponse, VolunteersMetaArgs, { state }>(
  'volunteer/getVolunteersVolunteerProfile',
  async ({
    pageNo, filters, search, sort,
  }) => {
    const apiQueryParams: VolunteerPaginatedQueryParams = {
      pageNo, size: rowsPerPage, volunteerType: convertFilterObjectToQueryString(filters.volunteerType), sort,
    };
    if (search.name) {
      apiQueryParams.name = search.name;
    }
    const response = await apiClient.getVolunteers(apiQueryParams);
    return {
      ...response, pageNo, filters, search, sort,
    };
  },
);

export const getPendingVolunteers = createAsyncThunk<GetVolunteersResponse, void, { state }>(
  'volunteer/getPendingVolunteers',
  async () => {
    const response = await apiClient.getPendingVolunteers();
    return response;
  },
);
