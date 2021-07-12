import { createSlice, SerializedError } from "@reduxjs/toolkit";
import {
  getPendingVolunteers,
  getPendingSignUps,
} from "@redux/actions/common/pendingRequestsTabs";
import { VolunteerData } from "@type/volunteer";
import { SignUpData } from "@type/signUp";

export type PendingRequestsState = {
  isLoading: boolean;
  error: SerializedError;
  pendingVolunteers: Array<VolunteerData>;
  pendingSignUps: Array<SignUpData>;
};

const initialState: PendingRequestsState = {
  isLoading: false,
  error: null,
  pendingVolunteers: [],
  pendingSignUps: [],
};

const pendingRequestsSlice = createSlice({
  name: "common/pendingRequestsTabs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPendingVolunteers.fulfilled, (state, action) => {
      const { payload } = action;
      state.pendingVolunteers = payload.data;
      state.isLoading = false;
    });
    builder.addCase(getPendingSignUps.fulfilled, (state, action) => {
      const { payload } = action;
      state.pendingSignUps = payload.data;
      state.isLoading = false;
    });

    builder.addCase(getPendingVolunteers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPendingVolunteers.rejected, (state, action) => {
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
