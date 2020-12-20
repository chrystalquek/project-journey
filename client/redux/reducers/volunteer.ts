import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData } from 'types/volunteer';
import { getVolunteers } from '@redux/actions/volunteer';

export type VolunteerState = {
  volunteers: Array<VolunteerData>;
  page: number,
  count: number;
}

const initialState: VolunteerState = {
  volunteers: [],
  page: 0,
  count: 0,
};

const volunteerSlice = createSlice({
  name: 'volunteer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit
    builder.addCase(getVolunteers.pending, (state) => {
      state.volunteers = [];
    });
    builder.addCase(getVolunteers.fulfilled, (state, action) => {
      const { payload } = action;
      state.volunteers = payload.response.data;
      state.count = payload.response.count;
      state.page = payload.pageNo;
    });
    builder.addCase(getVolunteers.rejected, (state) => {
      state.volunteers = [];
    });
  },
});

export default volunteerSlice.reducer;
