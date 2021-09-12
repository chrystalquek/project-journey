import {
  cancelEvent,
  createEvent,
  editEvent,
  getEvent,
  listEvents,
} from "@redux/actions/event";
import { FetchStatus, StoreState } from "@redux/store";
import {
  createEntityAdapter,
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { EventData } from "@type/event";
import { isDefined } from "@utils/helpers/typescript";

const eventsAdapter = createEntityAdapter<EventData>({
  selectId: (event) => event._id,
});

export type EventState = {
  listEventIds: string[];
  status: FetchStatus | null;
};

const initialState = eventsAdapter.getInitialState<EventState>({
  listEventIds: [],
  status: null,
});

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    resetEventStatus(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cancelEvent.fulfilled, (state, { meta }) => {
      eventsAdapter.removeOne(state, meta.arg);
    });
    builder.addCase(listEvents.pending, (state) => {
      state.listEventIds = [];
    });
    builder.addCase(listEvents.fulfilled, (state, { payload }) => {
      eventsAdapter.upsertMany(state, payload);
      state.listEventIds = payload.map((event) => event._id);
    });
    builder.addCase(listEvents.rejected, (state) => {
      state.listEventIds = [];
    });
    builder.addMatcher(
      isAnyOf(getEvent.fulfilled, createEvent.fulfilled, editEvent.fulfilled),
      (state, { payload }) => {
        eventsAdapter.upsertOne(state, payload);
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

export default eventSlice.reducer;
export const { resetEventStatus } = eventSlice.actions;

export const { selectById: selectEventById, selectAll: selectAllEvents } =
  eventsAdapter.getSelectors((state: StoreState) => state.event.event);

export const selectEventsByIds = (state: StoreState, ids: string[]) =>
  ids.map((id) => selectEventById(state, id)).filter(isDefined);
