import {
  createCommitmentApplication,
  listCommitmentApplications,
  updateCommitmentApplication,
} from "@redux/actions/commitmentApplication";
import { FetchStatus, StoreState } from "@redux/store";
import {
  createEntityAdapter,
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { CommitmentApplicationData } from "@type/commitmentApplication";
import { isDefined } from "@utils/helpers/typescript";

const caAdapter = createEntityAdapter<CommitmentApplicationData>({
  selectId: (ca) => ca._id,
});

export type CommitmentApplicationState = {
  listCommitmentApplicationIds: string[];
  status: FetchStatus | null;
};

const initialState = caAdapter.getInitialState<CommitmentApplicationState>({
  listCommitmentApplicationIds: [],
  status: null,
});

const commitmentApplicationSlice = createSlice({
  name: "commitmentApplication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listCommitmentApplications.pending, (state) => {
      state.listCommitmentApplicationIds = [];
    });
    builder.addCase(
      listCommitmentApplications.fulfilled,
      (state, { payload }) => {
        caAdapter.upsertMany(state, payload.data);
        state.listCommitmentApplicationIds = payload.data.map((ca) => ca._id);
      }
    );
    builder.addCase(listCommitmentApplications.rejected, (state) => {
      state.listCommitmentApplicationIds = [];
    });
    builder.addMatcher(
      isAnyOf(
        createCommitmentApplication.fulfilled,
        updateCommitmentApplication.fulfilled
      ),
      (state, { payload }) => {
        caAdapter.upsertOne(state, payload);
      }
    );
    builder.addMatcher(isPending, (state) => {
      state.status = "pending";
    });
    builder.addMatcher(isFulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addMatcher(isRejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default commitmentApplicationSlice.reducer;
export const {
  selectById: selectCommitmentApplicationById,
  selectAll: selectAllCommitmentApplications,
} = caAdapter.getSelectors((state: StoreState) => state.commitmentApplication);

export const selectCommitmentApplicationsByIds = (
  state: StoreState,
  ids: string[]
) =>
  ids.map((id) => selectCommitmentApplicationById(state, id)).filter(isDefined);
