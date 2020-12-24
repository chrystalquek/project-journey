import { rowsPerPage } from '@components/volunteer/VolunteerProfile';
import store from '@redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { convertFilterObjectToQueryString } from '@utils/helpers/TableOptions';
import { QueryParams } from 'api/request';
import { GetVolunteersResponse } from 'api/response';
import apiClient from '../../api/apiClient';

export const getVolunteers = createAsyncThunk<GetVolunteersResponse, QueryParams, { state }>(
  'volunteer/getVolunteers',
  async ({ pageNo, size, volunteerType }) => {
    const volunteerTypes = Object.assign({}, store.getState().volunteer.meta.filters.volunteerType); // get filter object
    if (volunteerType) {
      volunteerTypes[volunteerType] = !volunteerTypes[volunteerType]; // change boolean for checkbox that changed
    }
    const response = await apiClient.getVolunteers({ pageNo: pageNo || 0, size: size || rowsPerPage, volunteerType: convertFilterObjectToQueryString(volunteerTypes) }); // fill in default values if necessary
    return { ...response, pageNo: pageNo || 0, filters: { ...response.filters, volunteerType: volunteerTypes } };
  },
);
