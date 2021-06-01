import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "api/apiClient";
import { GetVolunteersPaginatedRequest } from "api/request";
import { convertFilterObjectToQueryString } from "@utils/helpers/filterObject";
import { VolunteerCollate, VolunteerState } from "@redux/reducers/volunteer/index";
import { Pagination } from "@type/Pagination";

export const getPaginatedVolunteers = createAsyncThunk(
    'volunteer/getVolunteers',
    async (query: Partial<Pagination & VolunteerCollate>, { getState }) => {
        // https://stackoverflow.com/questions/64793504/cannot-set-getstate-type-to-rootstate-in-createasyncthunk
        const { volunteer } = getState() as { volunteer: VolunteerState };
        const { collate, pagination } = volunteer // grab params from store if does not exist
        const request: GetVolunteersPaginatedRequest = {
            pageNo: query.pageNo ?? pagination.pageNo,
            size: query.size ?? pagination.size,
            volunteerType: convertFilterObjectToQueryString(query.filters?.volunteerType ?? collate.filters.volunteerType),
            name: query.search?.name ?? collate.search.name,
            sort: query.sort ?? collate.sort
        }
        const response = await apiClient.getVolunteersPaginated(request);
        return { response, query }
    },
);