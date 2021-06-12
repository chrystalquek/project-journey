import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@api/apiClient';
import { GetVolunteersPaginatedRequest } from '@api/request';
import { VolunteerCollate, VolunteerState } from '@redux/reducers/volunteer/index';
import { Pagination } from '@utils/types/Pagination';

// functions

// define generics for createAsyncThunk: return type, parameters and empty object: https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
export const getVolunteers = createAsyncThunk(
    'volunteer/getVolunteers',
    async (param: GetVolunteersParam, { getState }) => {
        const { volunteer } = getState() as { volunteer: VolunteerState }; // need to typecast state if getting state
        const { collate, pagination } = volunteer // grab state from store if does not exist in params
        const { newPagination, newCollate } = param

        // construct the request
        const request: GetVolunteersPaginatedRequest = {
            pageNo: newPagination?.pageNo ?? pagination.pageNo,
            size: newPagination?.size ?? pagination.size,
            volunteerType: Object.keys(newCollate?.filters?.volunteerType ?? collate.filters.volunteerType),
            name: newCollate?.search?.name ?? collate.search.name,
            sort: newCollate?.sort ?? collate.sort
        }
        const response = await apiClient.getVolunteers(request);

        // combine the response and params into one object that can be accessed by reducer
        return { response, newPagination, newCollate }
    },
);

// other funcions...

// parameter types
type GetVolunteersParam = { newPagination?: Partial<Pagination>, newCollate?: Partial<VolunteerCollate> }