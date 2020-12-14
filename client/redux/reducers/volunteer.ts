import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData } from 'types/volunteer';
import volunteer from '../actions/volunteer';

export type VolunteerState = {
  volunteers: Array<VolunteerData>;
}

const initialState: VolunteerState = {
  volunteers: [],
};

const volunteerSlice = createSlice({
  name: 'volunteer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit
    builder.addCase(volunteer.pending, (state) => {
      state.volunteers = [];
    });
    builder.addCase(volunteer.fulfilled, (state, action) => {
      const { payload } = action;
      state.volunteers = payload;
    });
    builder.addCase(volunteer.rejected, (state) => {
      state.volunteers = [];
    });
  },
});

export default volunteerSlice.reducer;
