import { rowsPerPage, VolunteerSortFieldsType } from '@components/volunteer/VolunteerProfile';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { VolunteerPaginatedQueryParams } from '@utils/api/request';
import { GetVolunteersPaginatedResponse, GetVolunteersResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';
import { VOLUNTEER_TYPE } from '@type/volunteer';
import { convertFilterObjectToQueryString } from '@utils/helpers/TableOptions';

type GetVolunteersVolunteerProfileParams = {
  pageNo?: number,
  volunteerType: Record<VOLUNTEER_TYPE, boolean>,
  name: string
  sort: VolunteerSortFieldsType
}

export const getVolunteersVolunteerProfile = createAsyncThunk<GetVolunteersPaginatedResponse, GetVolunteersVolunteerProfileParams, { state }>(
  'volunteer/getVolunteersVolunteerProfile',
  async ({ pageNo, volunteerType, name, sort }) => {
    const apiQueryParams: VolunteerPaginatedQueryParams = { pageNo: pageNo || 0, size: rowsPerPage, volunteerType: convertFilterObjectToQueryString(volunteerType), sort }
    if (name) {
      apiQueryParams.name = name
    }
    const response = await apiClient.getVolunteers(apiQueryParams); // fill in default values if necessary
    return { ...response, pageNo: pageNo || 0, filters: { volunteerType }, search: name, sort };
  },
);

export const getPendingVolunteers = createAsyncThunk<GetVolunteersResponse, void, { state }>(
  'volunteer/getPendingVolunteers',
  async () => {
    const response = await apiClient.getPendingVolunteers();
    return response;
  },
);
