import { createSlice } from '@reduxjs/toolkit';
import {
  createAndAcceptSignUp, createSignUp,
  getPendingSignUpsPendingApproval, getSignUps,
  getSignUpsUpcomingEvent,
  updateSignUp
} from '@redux/actions/signUp';
import { SignUpData } from 'types/signUp';

export type SignUpState = {
  data: Record<string, SignUpData>;
  pendingApproval: {
    pendingSignUpCount: number
  },
  upcomingEvent: {
    ids: Array<string> // signed up events
  },
  getSignUps: {
    currSignUps: Array<SignUpData> // signups from getSignUps action
  }
}

const initialState: SignUpState = {
  data: {},
  pendingApproval: {
    pendingSignUpCount: 0,
  },
  upcomingEvent: {
    ids: [],
  },
  getSignUps: {
    currSignUps: [],
  }
};

// parse all Dates etc before saving to store
const addToData = (signUps: Array<SignUpData>, state: SignUpState) => {
  signUps.forEach((signUp) => state.data[signUp._id] = {
    ...signUp,
  });
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit
    builder.addCase(getSignUpsUpcomingEvent.fulfilled, (state, action) => {
      const { payload } = action;
      addToData(payload.data, state);
    });
    builder.addCase(getPendingSignUpsPendingApproval.fulfilled, (state, action) => {
      const { payload } = action;
      state.pendingApproval.pendingSignUpCount = payload.count;
    });
    builder.addCase(getSignUps.fulfilled, (state, action) => {
      const { payload } = action;
      state.getSignUps.currSignUps = payload.data;
    });

    // Using redux for logging purposes
    builder.addCase(createAndAcceptSignUp.pending, (state, action) => {
      // do nothing yet
    })
    builder.addCase(createAndAcceptSignUp.fulfilled, (state, action) => {
      // do nothing yet
    })
    builder.addCase(createAndAcceptSignUp.rejected, (state, action) => {
      // do nothing yet
    })
    builder.addCase(createSignUp.pending, (state, action) => {
      // do nothing yet
    })
    builder.addCase(createSignUp.fulfilled, (state, action) => {
      // do nothing yet
    })
    builder.addCase(createSignUp.rejected, (state, action) => {
      // do nothing yet
    })
    builder.addCase(updateSignUp.pending, (state, action) => {
      // do nothing yet
    })
    builder.addCase(updateSignUp.fulfilled, (state, action) => {
      // do nothing yet
    })
    builder.addCase(updateSignUp.rejected, (state, action) => {
      // do nothing yet
    })
  },
});

export default signUpSlice.reducer;
