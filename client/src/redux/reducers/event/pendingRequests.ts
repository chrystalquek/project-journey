import { createSlice, SerializedError } from "@reduxjs/toolkit";
import {
  getUpcomingEvents,
  getPendingSignUps,
} from "@redux/actions/events/pendingRequests";
import { EventData } from "@type/event";
import { SignUpData } from "@type/signUp";

export type PendingRequestsState = {
  isLoading: boolean;
  error: SerializedError;
  pendingSignUps: Array<SignUpData>;
  upcomingEvents: Array<EventData>;
};

const initialState: PendingRequestsState = {
  isLoading: false,
  error: null,
  pendingSignUps: [],
  upcomingEvents: [],
};

const pendingRequestsSlice = createSlice({
  name: "event/pendingRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUpcomingEvents.fulfilled, (state, action) => {
      const { payload } = action;
      state.upcomingEvents = payload.data;
      state.isLoading = false;
    });
    builder.addCase(getPendingSignUps.fulfilled, (state, action) => {
      const { payload } = action;
      state.pendingSignUps = payload.data;
      state.isLoading = false;
    });

    builder.addCase(getUpcomingEvents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUpcomingEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(getPendingSignUps.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPendingSignUps.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default pendingRequestsSlice.reducer;
