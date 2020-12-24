import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData, VOLUNTEER_TYPE } from 'types/volunteer';
import { getVolunteers } from '@redux/actions/volunteer';
import { initializeFilterObject } from '@utils/helpers/TableOptions';

export type VolunteerState = {
  data: Record<string, VolunteerData>;
  meta: {
    currentPageIds: Array<string>
    pageNo: number,
    count: number
    filters: {
      volunteerType: Record<VOLUNTEER_TYPE, boolean>
    }
  }
}

const initialState: VolunteerState = {
  data: {},
  meta: {
    currentPageIds: [],
    pageNo: 0,
    count: 0,
    filters: {
      volunteerType: initializeFilterObject(VOLUNTEER_TYPE),
    }
  }
};

const volunteerSlice = createSlice({
  name: 'volunteer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit
    builder.addCase(getVolunteers.pending, (state) => {
      state.meta.currentPageIds = []
    });
    builder.addCase(getVolunteers.fulfilled, (state, action) => {
      const { payload } = action;
      // normalize from array to object structure
      payload.data.forEach(volunteer => state.data[volunteer._id] = {
        ...volunteer,
        birthday: new Date(volunteer.birthday),
        created_at: new Date(volunteer.created_at),
      });
      state.meta.currentPageIds = payload.data.map(volunteer => volunteer._id);
      state.meta.count = payload.count;
      state.meta.pageNo = payload.pageNo;
      state.meta.filters.volunteerType = payload.filters.volunteerType;
    });
    builder.addCase(getVolunteers.rejected, (state) => {
      state.meta.currentPageIds = []
    });
  },
});

export default volunteerSlice.reducer;
