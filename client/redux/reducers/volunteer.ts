import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData, VolunteerType } from '@type/volunteer';
import { getPendingVolunteers } from '@redux/actions/volunteer';
import { updateCommitmentApplication } from '@redux/actions/commitmentApplication';
import { CommitmentApplicationStatus } from '@type/commitmentApplication';

export type PendingVolunteerState = {
  data: Record<string, VolunteerData>;
  pendingVolunteers: { // used for dashboard and volunteer > pending requests
    ids: Array<string> // ie volunteers with committment applications that are state pending
  }
}

const initialState: PendingVolunteerState = {
  data: {},
  pendingVolunteers: {
    ids: [],
  }
};

// parse all Dates etc before saving to store
const addToData = (volunteers: Array<VolunteerData>, state: PendingVolunteerState) => {
  volunteers.forEach((volunteer) => {
    state.data[volunteer._id] = {
      ...volunteer,
      birthday: volunteer.birthday,
      createdAt: volunteer.createdAt,
    };
  });
};

const volunteerSlice = createSlice({
  name: 'volunteer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit

    builder.addCase(getPendingVolunteers.fulfilled, (state, action) => {
      const { payload } = action;
      addToData(payload.data, state);
      state.pendingVolunteers.ids = payload.data.map((volunteer) => volunteer._id);
    });

    builder.addCase(updateCommitmentApplication.fulfilled, (state, action) => {
      const { payload } = action;
      // update that volunteer's status
      const volunteer = state.data[payload.volunteerId];
      if (payload.status == CommitmentApplicationStatus.Accepted) {
        state.data[payload.volunteerId] = {
          ...volunteer,
          volunteerType: VolunteerType.COMMITTED,
        };
      }
      // no longer a pending request with either accept or reject
      state.pendingVolunteers.ids = state.pendingVolunteers.ids.filter((volunteerId) => volunteerId != payload.volunteerId);
    });
  },
});

export default volunteerSlice.reducer;
