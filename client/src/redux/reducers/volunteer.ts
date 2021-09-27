import {
  getPendingCommitmentApplications,
  getPendingVolunteers,
  getVolunteer,
  getVolunteersById,
  listVolunteers,
  updateCommitmentApplication,
  updateVolunteer,
} from "@redux/actions/volunteer";
import { FetchStatus, StoreState } from "@redux/store";
import {
  createEntityAdapter,
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
  SerializedError,
} from "@reduxjs/toolkit";
import {
  CommitmentApplicationData,
  CommitmentApplicationStatus,
} from "@type/commitmentApplication";
import { VolunteerData } from "@type/volunteer";
import { isDefined } from "@utils/helpers/typescript";

const volunteersAdapter = createEntityAdapter<VolunteerData>({
  selectId: (volunteer) => volunteer._id,
});

export type VolunteerState = {
  listVolunteersIds: string[];
  totalCount: number;
  status: FetchStatus | null;
  error: SerializedError | null;

  pendingVolunteerIds: string[];
  pendingCommitmentApplications: CommitmentApplicationData[];
};

const initialState = volunteersAdapter.getInitialState<VolunteerState>({
  listVolunteersIds: [],
  totalCount: 0,
  status: null,
  error: null,

  pendingVolunteerIds: [],
  pendingCommitmentApplications: [],
});

const volunteerSlice = createSlice({
  name: "volunteer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listVolunteers.fulfilled, (state, { payload }) => {
      volunteersAdapter.upsertMany(state, payload.data);
      state.listVolunteersIds = payload.data.map((v) => v._id);
      state.totalCount = payload.count;
    });
    builder.addCase(getVolunteersById.fulfilled, (state, { payload }) => {
      volunteersAdapter.upsertMany(state, payload.data);
    });

    // Pending Requests
    builder.addCase(getPendingVolunteers.fulfilled, (state, { payload }) => {
      volunteersAdapter.upsertMany(state, payload.data);
      state.pendingVolunteerIds = payload.data.map((v) => v._id);
    });
    builder.addCase(
      getPendingCommitmentApplications.fulfilled,
      (state, { payload }) => {
        state.pendingCommitmentApplications = payload.data;
      }
    );
    builder.addCase(
      updateCommitmentApplication.fulfilled,
      (state, { payload }) => {
        // remove commitment application since no longer pending
        if (payload.status !== CommitmentApplicationStatus.Pending) {
          state.pendingVolunteerIds = state.pendingVolunteerIds.filter(
            (id) => id !== payload.volunteerId
          );
          state.pendingCommitmentApplications =
            state.pendingCommitmentApplications.filter(
              (comApp) => comApp._id !== payload._id
            );
        }
      }
    );

    builder.addMatcher(
      isAnyOf(getVolunteer.fulfilled, updateVolunteer.fulfilled),
      (state, { payload }) => {
        volunteersAdapter.upsertOne(state, payload);
      }
    );
    builder.addMatcher(isPending, (state) => {
      state.status = "pending";
    });
    builder.addMatcher(isFulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addMatcher(isRejected, (state, { error }) => {
      state.status = "rejected";
      state.error = error;
    });
  },
});

export default volunteerSlice.reducer;
export const {
  selectById: selectVolunteerById,
  selectAll: selectAllVolunteers,
} = volunteersAdapter.getSelectors((state: StoreState) => state.volunteer);

export const selectVolunteersByIds = (state: StoreState, ids: string[]) =>
  ids.map((id) => selectVolunteerById(state, id)).filter(isDefined);
