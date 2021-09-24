import {
  getVolunteer,
  getVolunteersById,
  listVolunteers,
  updateVolunteer,
} from "@redux/actions/volunteer/index";
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
};

const initialState = volunteersAdapter.getInitialState<VolunteerState>({
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
} = volunteersAdapter.getSelectors(
  (state: StoreState) => state.volunteer.index
);

export const selectVolunteersByIds = (state: StoreState, ids: string[]) =>
  ids.map((id) => selectVolunteerById(state, id)).filter(isDefined);
