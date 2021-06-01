import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VolunteerData, VOLUNTEER_TYPE } from 'types/volunteer';
import { initializeFilterObject } from '@utils/helpers/filterObject';
import { getPaginatedVolunteers } from '@redux/actions/volunteer/index';
import { GetVolunteersPaginatedRequest } from 'api/request';
import { rowsPerPage } from '@components/volunteer/Volunteers';
import { Pagination } from '../../../types/Pagination';

export type VolunteerSortFieldsType = 'name' | 'createdAt';
export type VolunteerCollate = {
    filters: {
        volunteerType: Record<VOLUNTEER_TYPE, boolean>
    },
    search: {
        name: string
    },
    sort: VolunteerSortFieldsType
}

export type VolunteerState = {
    loadingStatus: boolean,
    volunteers: VolunteerData[],
    collate: VolunteerCollate,
    pagination: Pagination
}

const initialState: VolunteerState = {
    loadingStatus: false,
    volunteers: [],
    collate: {
        filters: {
            volunteerType: initializeFilterObject(VOLUNTEER_TYPE),
        },
        search: {
            name: '',
        },
        sort: 'name',
    },
    pagination: {
        total: 0,
        pageNo: 0,
        size: rowsPerPage
    },
};

const volunteerSlice = createSlice({
    name: 'volunteer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPaginatedVolunteers.pending, (state) => {
            state.volunteers = [];
            state.loadingStatus = true;
        });
        builder.addCase(getPaginatedVolunteers.fulfilled, (state, action) => {
            const { payload } = action;
            state.volunteers = payload.response.data
            state.pagination.size = payload.response.count
            state.collate = {
                filters: payload.query.filters ?? state.collate.filters,
                search: payload.query.search ?? state.collate.search,
                sort: payload.query.sort ?? state.collate.sort
            }
            state.pagination = {
                total: payload.response.count,
                pageNo: payload.query.pageNo ?? state.pagination.pageNo,
                size: rowsPerPage
            }
            state.loadingStatus = false;
        });
        builder.addCase(getPaginatedVolunteers.rejected, (state) => {
            state.volunteers = [];
            state.loadingStatus = false;
        });
    },
});

export default volunteerSlice.reducer;
