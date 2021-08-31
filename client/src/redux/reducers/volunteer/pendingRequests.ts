import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { VolunteerData } from "@type/volunteer";
import {
  getPendingVolunteers,
  updateCommitmentApplication,
  getPendingCommitmentApplications,
} from "@redux/actions/volunteer/pendingRequests";
import {
  CommitmentApplicationData,
  CommitmentApplicationStatus,
} from "@type/commitmentApplication";

export type PendingRequestsState = {
  isLoading: boolean;
  error: SerializedError | null;
  pendingVolunteers: Array<VolunteerData>;
  pendingCommitmentApplications: Array<CommitmentApplicationData>;
};

const initialState: PendingRequestsState = {
  isLoading: false,
  error: null,
  pendingVolunteers: [],
  pendingCommitmentApplications: [],
};

const pendingRequestsSlice = createSlice({
  name: "volunteer/pendingRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPendingVolunteers.fulfilled, (state, action) => {
      const { payload } = action;
      state.pendingVolunteers = payload.data;
      state.isLoading = false;
    });
    builder.addCase(
      getPendingCommitmentApplications.fulfilled,
      (state, action) => {
        const { payload } = action;
        state.pendingCommitmentApplications = payload.data;
        state.isLoading = false;
      }
    );
    builder.addCase(updateCommitmentApplication.fulfilled, (state, action) => {
      const { payload } = action;
      // remove commitment application since no longer pending
      if (payload.status !== CommitmentApplicationStatus.Pending) {
        state.pendingVolunteers = state.pendingVolunteers.filter(
          (vol) => vol._id !== payload.volunteerId
        );
        state.pendingCommitmentApplications =
          state.pendingCommitmentApplications.filter(
            (comApp) => comApp._id !== payload._id
          );
      }
      state.isLoading = false;
    });

    builder.addCase(getPendingVolunteers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPendingVolunteers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(getPendingCommitmentApplications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getPendingCommitmentApplications.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      }
    );
    builder.addCase(updateCommitmentApplication.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCommitmentApplication.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default pendingRequestsSlice.reducer;
