import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "api/apiClient";
import { GetVolunteersPaginatedRequest } from "api/request";
import { convertFilterObjectToQueryString } from "@utils/helpers/filterObject";
import { VolunteerCollate, VolunteerState } from "@redux/reducers/volunteer/index";
import { Pagination } from "@type/Pagination";
import { GetVolunteersPaginatedResponse } from "api/response";

// functions

// define generics for createAsyncThunk: return type, parameters and empty object: https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
export const getPaginatedVolunteers = createAsyncThunk<GetPaginatedVolunteersReturnType, GetPaginatedVolunteersParam, { state }>(
    'volunteer/getVolunteers',
    async ({ newPagination, newCollate }: GetPaginatedVolunteersParam, { getState }) => {
        const { volunteer } = getState() as { volunteer: VolunteerState }; // need to typecast state if getting state
        const { collate, pagination } = volunteer // grab state from store if does not exist in params

        // construct the request
        const request: GetVolunteersPaginatedRequest = {
            pageNo: newPagination?.pageNo ?? pagination.pageNo,
            size: newPagination?.size ?? pagination.size,
            volunteerType: convertFilterObjectToQueryString(newCollate?.filters?.volunteerType ?? collate.filters.volunteerType),
            name: newCollate?.search?.name ?? collate.search.name,
            sort: newCollate?.sort ?? collate.sort
        }
        const response = await apiClient.getVolunteersPaginated(request);

        // combine the response and params into one object that can be accessed by reducer
        return { response, newPagination, newCollate }
    },
);

// other funcions...

// parameter and return types
type GetPaginatedVolunteersParam = { newPagination?: Partial<Pagination>, newCollate?: Partial<VolunteerCollate> }
type GetPaginatedVolunteersReturnType = { response: GetVolunteersPaginatedResponse } & GetPaginatedVolunteersParam

// other return types...