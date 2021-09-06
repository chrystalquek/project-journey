import { createSlice } from "@reduxjs/toolkit";
import {
  createAndAcceptSignUp,
  createSignUp,
  deleteSignUp,
  getSignUps,
  getSignUpsUpcomingEvent,
  updateSignUp,
} from "@redux/actions/signUp";
import { SignUpData } from "@type/signUp";

export type SignUpState = {
  data: Record<string, SignUpData | null>;
  volunteerSignUpsForUpcomingEvent: {
    // signups for a volunteer's upcoming events // used for dashboard
    ids: Array<string>; // signed up events
  };
  getSignUps: {
    currSignUps: Array<SignUpData>; // signups from getSignUps action
  };
};

const initialState: SignUpState = {
  data: {},
  volunteerSignUpsForUpcomingEvent: {
    ids: [],
  },
  getSignUps: {
    currSignUps: [],
  },
};

// parse all Dates etc before saving to store
const addToData = (signUps: Array<SignUpData>, state: SignUpState) => {
  signUps.forEach((signUp) => {
    state.data[signUp._id] = signUp;
  });
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit
    builder.addCase(getSignUpsUpcomingEvent.fulfilled, (state, action) => {
      const { payload } = action;
      addToData(payload.data, state);
      state.volunteerSignUpsForUpcomingEvent.ids = payload.data.map(
        (signUp) => signUp._id
      );
    });

    builder.addCase(getSignUps.fulfilled, (state, action) => {
      const { payload } = action;
      state.getSignUps.currSignUps = payload.data;
    });

    // Using redux for logging purposes
    builder.addCase(createAndAcceptSignUp.pending, () => {
      // do nothing yet
    });
    builder.addCase(createAndAcceptSignUp.fulfilled, () => {
      window.location.reload();
    });
    builder.addCase(createAndAcceptSignUp.rejected, () => {
      window.location.reload();
    });
    builder.addCase(createSignUp.pending, () => {
      // do nothing yet
    });
    builder.addCase(createSignUp.fulfilled, () => {
      // do nothing yet
    });
    builder.addCase(createSignUp.rejected, () => {
      // do nothing yet
    });
    builder.addCase(updateSignUp.fulfilled, (state, action) => {
      const { payload } = action;
      state.data[payload._id] = payload;
    });
    builder.addCase(deleteSignUp.fulfilled, (state, action) => {
      const { meta } = action;
      state.data[meta.arg.id] = null;
    });
  },
});

export default signUpSlice.reducer;
