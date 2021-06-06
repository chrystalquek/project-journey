import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { VolunteerData, VolunteerType } from 'types/volunteer';
import { initializeFilterObject } from '@utils/helpers/filterObject';
import { getVolunteers } from '@redux/actions/volunteer/index';
import { rowsPerPage } from '@components/volunteer/Index';
import { Pagination } from '../../../utils/types/Pagination';

export type VolunteerSortFieldsType = 'name' | 'createdAt';

// collate objects can be defined later on and should have filters, search, sort fields too
export type VolunteerCollate = {
    filters: {
        volunteerType: Record<VolunteerType, boolean>
    },
    search: {
        name: string
    },
    sort: VolunteerSortFieldsType
}

// all state should have a loadingStatus and error
// state should contain most of state of the component, including collate and pagination
export type VolunteerState = {
    isLoading: boolean,
    error: SerializedError,
    volunteers: VolunteerData[],
    collate: VolunteerCollate,
    pagination: Pagination
}

const initialState: VolunteerState = {
    isLoading: false,
    error: null,
    volunteers: [],
    collate: {
        filters: {
            // use these helper function for filter objects
            volunteerType: initializeFilterObject(VolunteerType),
        },
        search: {
            name: '',
        },
        sort: 'name',
    },
    pagination: {
        count: 0,
        pageNo: 0,
        size: rowsPerPage
    },
};

const volunteerSlice = createSlice({
    name: 'volunteer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVolunteers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getVolunteers.fulfilled, (state, action) => {
            const { payload } = action;
            state.volunteers = payload.response.data
            state.collate = Object.assign(state.collate, payload.newCollate)
            state.pagination = Object.assign(state.pagination, payload.newPagination)
            state.pagination.count = payload.response.count
            state.isLoading = false;
        });
        builder.addCase(getVolunteers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error; // catches http errors too (other than 404 which is caught by NEXT)
        });
    },
});

export default volunteerSlice.reducer;
