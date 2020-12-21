import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData } from 'types/volunteer';
import { getVolunteers } from '@redux/actions/volunteer';

export type VolunteerState = {
  // TODO need to save to a big hashmap of volunteers?
  volunteers: Array<VolunteerData>; // display in table
  page: number,
  count: number;
}

const initialState: VolunteerState = {
  volunteers: [],
  page: 0,
  count: 0,
};

const parseVolunteer = (volunteer: VolunteerData) => {
  return {
    ...volunteer,
    birthday: new Date(volunteer.birthday),
    created_at: new Date(volunteer.created_at),
  }
}

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
      state.volunteers = payload.response.data.map(vol => parseVolunteer(vol));
      state.count = payload.response.count;
      state.page = payload.pageNo;
    });
    builder.addCase(getVolunteers.rejected, (state) => {
      state.volunteers = [];
    });
  },
});

export default volunteerSlice.reducer;
