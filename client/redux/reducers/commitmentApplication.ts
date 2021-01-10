import { getCommitmentApplications, updateCommitmentApplication, createCommitmentApplication } from '@redux/actions/commitmentApplication';
import { createSlice } from '@reduxjs/toolkit';
import { CommitmentApplicationData } from '@type/commitmentApplication';

export type CommitmentApplicationState = {
  data: Record<string, CommitmentApplicationData>;
  pendingCommitmentApplications: { // used for dashboard and Volunteers > pending requests
    ids: Array<string> // ie ommittment applications that are state pending
  }
}

const initialState: CommitmentApplicationState = {
  data: {},
  pendingCommitmentApplications: {
    ids: [],
  },
};

// parse all Dates etc before saving to store
const addToData = (commitmentApplications: Array<CommitmentApplicationData>, state: CommitmentApplicationState) => {
  commitmentApplications.forEach((commitmentApplication) => state.data[commitmentApplication._id] = {
    ...commitmentApplication,
    createdAt: new Date(commitmentApplication.createdAt),
  });
};

const commitmentApplicationSlice = createSlice({
  name: 'commitmentApplication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommitmentApplications.fulfilled, (state, action) => {
      const { payload } = action;
      addToData(payload.data, state);
      state.pendingCommitmentApplications.ids = payload.data.map((commitmentApplication) => commitmentApplication._id);
    });
    builder.addCase(updateCommitmentApplication.fulfilled, (state, action) => {
      const { payload } = action;
      addToData([payload], state);
      state.pendingCommitmentApplications.ids = state.pendingCommitmentApplications.ids.filter((commitmentApplicationId) => commitmentApplicationId != payload._id);
    });
    builder.addCase(createCommitmentApplication.fulfilled, (state, action) => {
      const { payload } = action;
      const newCommitmentApplication = { ...payload, createdAt: new Date(payload.createdAt) } as CommitmentApplicationData;
      state.data[newCommitmentApplication._id] = newCommitmentApplication;
      state.pendingCommitmentApplications.ids.push(newCommitmentApplication._id);
    });
  },
});

export default commitmentApplicationSlice.reducer;
