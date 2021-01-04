import { createSlice } from '@reduxjs/toolkit';
import { getPendingSignUps, getSignUpsUpcomingEvent } from '@redux/actions/signUp';
import { SignUpData } from 'types/signUp';

export type SignUpState = {
  data: Record<string, SignUpData>;
  volunteerSignUpsForUpcomingEvent: { // signups for a volunteer's upcoming events // used for dashboard
    ids: Array<string> // signed up events
  },
  pendingSignUps: { // pending sign ups // used for events > pending requests
    ids: Array<string>
  }
}

const initialState: SignUpState = {
  data: {},
  volunteerSignUpsForUpcomingEvent: {
    ids: []
  },
  pendingSignUps: {
    ids: []
  }
};

// parse all Dates etc before saving to store
const addToData = (signUps: Array<SignUpData>, state: SignUpState) => {
  signUps.forEach(signUp => state.data[signUp._id] = {
    ...signUp,
  });
}

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit
    builder.addCase(getSignUpsUpcomingEvent.fulfilled, (state, action) => {
      const { payload } = action;
      addToData(payload.data, state)
      state.volunteerSignUpsForUpcomingEvent.ids = payload.data.map(signUp => signUp._id)
    });
    builder.addCase(getPendingSignUps.fulfilled, (state, action) => {
      const { payload } = action;
      addToData(payload.data, state)
      state.pendingSignUps.ids = payload.data.map(signUp => signUp._id)
    });
  },
});

export default signUpSlice.reducer;
