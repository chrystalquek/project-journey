import { createSlice } from '@reduxjs/toolkit';
import { getPendingSignUpsPendingApproval, getSignUpsUpcomingEvent } from '@redux/actions/signUp';
import { SignUpData } from 'types/signUp';

export type SignUpState = {
  data: Record<string, SignUpData>;
  pendingApproval: {
    pendingSignUpCount: number
  },
  upcomingEvent: {
    ids: Array<string> // signed up events
  }
}

const initialState: SignUpState = {
  data: {},
  pendingApproval: {
    pendingSignUpCount: 0
  },
  upcomingEvent: {
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
    });
    builder.addCase(getPendingSignUpsPendingApproval.fulfilled, (state, action) => {
      const { payload } = action;
      state.pendingApproval.pendingSignUpCount = payload.count
    });
  },
});

export default signUpSlice.reducer;
