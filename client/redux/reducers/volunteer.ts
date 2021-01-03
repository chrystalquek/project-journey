import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData, VOLUNTEER_TYPE } from 'types/volunteer';
import { getPendingVolunteersPendingApproval, getVolunteersVolunteerProfile } from '@redux/actions/volunteer';
import { initializeFilterObject } from '@utils/helpers/TableOptions';

export type VolunteerState = {
  data: Record<string, VolunteerData>;
  pendingApproval: {
    pendingVolunteerCount: number
  }
  volunteerProfile: {
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
  pendingApproval: {
    pendingVolunteerCount: 0
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
  volunteers.forEach((volunteer) => state.data[volunteer._id] = {
    ...volunteer,
    birthday: new Date(volunteer.birthday),
    createdAt: new Date(volunteer.createdAt),
  });
}

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
      addToData(payload.data, state)
      state.volunteerProfile.ids = payload.data.map((volunteer) => volunteer._id);
      state.volunteerProfile.count = payload.count;
      state.volunteerProfile.pageNo = payload.pageNo;
      state.volunteerProfile.filters.volunteerType = payload.filters.volunteerType;
    });
    builder.addCase(getVolunteersVolunteerProfile.rejected, (state) => {
      state.volunteerProfile.ids = [];
    });

    builder.addCase(getPendingVolunteersPendingApproval.fulfilled, (state, action) => {
      const { payload } = action;
      state.pendingApproval.pendingVolunteerCount = payload.count
    });

  },
});

export default volunteerSlice.reducer;
