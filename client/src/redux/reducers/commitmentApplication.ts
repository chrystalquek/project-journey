import {
  updateCommitmentApplication,
  createCommitmentApplication,
} from "@redux/actions/commitmentApplication";
import { createSlice } from "@reduxjs/toolkit";
import { CommitmentApplicationData } from "@type/commitmentApplication";

export type CommitmentApplicationState = {
  data: Record<string, CommitmentApplicationData>;
};

const initialState: CommitmentApplicationState = {
  data: {},
};

// parse all Dates etc before saving to store
const addToData = (
  commitmentApplications: Array<CommitmentApplicationData>,
  state: CommitmentApplicationState
) => {
  commitmentApplications.forEach((commApp) => {
    state.data[commApp._id] = {
      ...commApp,
      createdAt: commApp.createdAt,
    };
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
  },
});

export default commitmentApplicationSlice.reducer;
