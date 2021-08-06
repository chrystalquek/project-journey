import {
  updateCommitmentApplication,
  createCommitmentApplication,
  getCommitmentApplications,
} from "@redux/actions/commitmentApplication";
import { createSlice } from "@reduxjs/toolkit";
import { CommitmentApplicationData } from "@type/commitmentApplication";

export type CommitmentApplicationState = {
  data: Record<string, CommitmentApplicationData>;
  ownIds: string[];
};

const initialState: CommitmentApplicationState = {
  data: {},
  ownIds: [],
};

const addToData = (
  commitmentApplications: Array<CommitmentApplicationData>,
  state: CommitmentApplicationState
) => {
  commitmentApplications.forEach((commApp) => {
    state.data[commApp._id] = commApp;
  });
};

const commitmentApplicationSlice = createSlice({
  name: "commitmentApplication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCommitmentApplication.fulfilled, (state, action) => {
      const { payload } = action;
      addToData([payload], state);
    });
    builder.addCase(createCommitmentApplication.fulfilled, (state, action) => {
      const { payload } = action;
      const newCommitmentApplication = {
        ...payload,
        createdAt: payload.createdAt,
      } as CommitmentApplicationData;
      state.data[newCommitmentApplication._id] = newCommitmentApplication;
    });
    builder.addCase(getCommitmentApplications.fulfilled, (state, action) => {
      const { payload } = action;
      addToData(payload.data, state);
      if (action.meta.arg.volunteerId) {
        // further check on whether this is equal to state.user._id
        state.ownIds = payload.data.map((app) => app._id);
      }
    });
  },
});

export default commitmentApplicationSlice.reducer;
