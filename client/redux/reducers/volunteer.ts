import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData, VOLUNTEER_TYPE } from 'types/volunteer';
import { getPendingVolunteers, getVolunteersVolunteerProfile } from '@redux/actions/volunteer';
import { initializeFilterObject } from '@utils/helpers/TableOptions';
import { updateCommitmentApplication } from '@redux/actions/commitmentApplication';
import { CommitmentApplicationStatus } from '@type/commitmentApplication';

export type VolunteerState = {
  data: Record<string, VolunteerData>;
  pendingVolunteers: { // used for dashboard and volunteer > pending requests
    ids: Array<string> // ie volunteers with committment applications that are state pending
  }
  volunteerProfile: { // volunteer > volunteer-profile
    ids: Array<string>
    pageNo: number,
    count: number
    filters: {
      volunteerType: Record<VOLUNTEER_TYPE, boolean>
    }
  }
}

const initialState: VolunteerState = {
  data: {},
  pendingVolunteers: {
    ids: [],
  },
  volunteerProfile: {
    ids: [],
    pageNo: 0,
    count: 0,
    filters: {
      volunteerType: initializeFilterObject(VOLUNTEER_TYPE),
    },
  },
};

// parse all Dates etc before saving to store
const addToData = (volunteers: Array<VolunteerData>, state: VolunteerState) => {
  volunteers.forEach((volunteer) => {
    state.data[volunteer._id] = {
      ...volunteer,
      birthday: new Date(volunteer.birthday),
      createdAt: new Date(volunteer.createdAt),
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
    builder.addCase(getVolunteersVolunteerProfile.pending, (state) => {
      state.volunteerProfile.ids = [];
    });
    builder.addCase(getVolunteersVolunteerProfile.fulfilled, (state, action) => {
      const { payload } = action;
      addToData(payload.data, state);
      state.volunteerProfile.ids = payload.data.map((volunteer) => volunteer._id);
      state.volunteerProfile.count = payload.count;
      state.volunteerProfile.pageNo = payload.pageNo;
      state.volunteerProfile.filters.volunteerType = payload.filters.volunteerType;
    });
    builder.addCase(getVolunteersVolunteerProfile.rejected, (state) => {
      state.volunteerProfile.ids = [];
    });

    builder.addCase(getPendingVolunteers.fulfilled, (state, action) => {
      const { payload } = action;
      addToData(payload.data, state)
      state.pendingVolunteers.ids = payload.data.map((volunteer) => volunteer._id);
    });

    builder.addCase(updateCommitmentApplication.fulfilled, (state, action) => {
      const { payload } = action;
      // update that volunteer's status
      const volunteer = state.data[payload.volunteerId];
      if (payload.status == CommitmentApplicationStatus.Accepted) {
        state.data[payload.volunteerId] = {
          ...volunteer,
          volunteerType: VOLUNTEER_TYPE.COMMITED
        }
      }
      // no longer a pending request with either accept or reject
      state.pendingVolunteers.ids = state.pendingVolunteers.ids.filter((volunteerId) => volunteerId != payload.volunteerId)
    });
  },
});

export default volunteerSlice.reducer;
