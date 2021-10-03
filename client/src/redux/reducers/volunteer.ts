import { updateCommitmentApplication } from "@redux/actions/commitmentApplication";
import {
  getPendingVolunteers,
  getVolunteer,
  getVolunteersById,
  listVolunteers,
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
import { CommitmentApplicationStatus } from "@type/commitmentApplication";
import { VolunteerData } from "@type/volunteer";
import { isDefined } from "@utils/helpers/typescript";

const volunteersAdapter = createEntityAdapter<VolunteerData>({
  selectId: (volunteer) => volunteer._id,
});

export type VolunteerState = {
  pendingVolunteerIds: string[];
  listVolunteersIds: string[];
  totalCount: number;
  status: FetchStatus | null;
  error: SerializedError | null;
};

const initialState = volunteersAdapter.getInitialState<VolunteerState>({
  pendingVolunteerIds: [],
  listVolunteersIds: [],
  totalCount: 0,
  status: null,
  error: null,
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
    builder.addCase(getPendingVolunteers.fulfilled, (state, { payload }) => {
      volunteersAdapter.upsertMany(state, payload.data);
      state.pendingVolunteerIds = payload.data.map((v) => v._id);
    });
    builder.addCase(
      updateCommitmentApplication.fulfilled,
      (state, { payload }) => {
        if (payload.status !== CommitmentApplicationStatus.Pending) {
          state.pendingVolunteerIds = state.pendingVolunteerIds.filter(
            (volId) => volId !== payload.volunteerId
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
    builder.addMatcher(
      isPending(
        getPendingVolunteers,
        getVolunteer,
        getVolunteersById,
        listVolunteers,
        updateVolunteer
      ),
      (state) => {
        state.status = "pending";
      }
    );
    builder.addMatcher(
      isFulfilled(
        getPendingVolunteers,
        getVolunteer,
        getVolunteersById,
        listVolunteers,
        updateVolunteer
      ),
      (state) => {
        state.status = "fulfilled";
      }
    );
    builder.addMatcher(
      isRejected(
        getPendingVolunteers,
        getVolunteer,
        getVolunteersById,
        listVolunteers,
        updateVolunteer
      ),
      (state, { error }) => {
        state.status = "rejected";
        state.error = error;
      }
    );
  },
});

export default volunteerSlice.reducer;
export const {
  selectById: selectVolunteerById,
  selectAll: selectAllVolunteers,
} = volunteersAdapter.getSelectors((state: StoreState) => state.volunteer);

export const selectVolunteersByIds = (state: StoreState, ids: string[]) =>
  ids.map((id) => selectVolunteerById(state, id)).filter(isDefined);
