import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getAllEvents,
  getEvent,
  editEvent,
  createEvent,
  getEventsUpcomingEvent,
  getSignedUpEventsUpcomingEvent,
} from '@redux/actions/event';

import { EventData } from 'types/event';
import { deleteSignUp } from '@redux/actions/signUp';

type FetchStatus = 'fetching' | 'fulfilled' | 'rejected' | '';

export type EventState = {
    events: Array<EventData>; // TODO rewrite this to array of IDs
    data: Record<string, EventData>;
    upcomingEvent: {
        // part of dashboard and events > pending requests
        ids: Array<string>; // if admin, all events. if volunteer, signed up events.
    };
    form: EventData | null;
    status: FetchStatus;
};

const initialState: EventState = {
  events: [],
  data: {},
  upcomingEvent: {
    ids: [],
  },
  form: null,
  status: '',
};

// parse all Dates etc before saving to store
const addToData = (events: Array<EventData>, state: EventState) => {
  events.forEach(
    (event) => (state.data[event._id] = {
      ...event,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      deadline: new Date(event.deadline),
    }),
  );
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    resetEventStatus(state) {
      state.status = '';
    },
  },
  extraReducers: (builder) => {
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit
    builder.addCase(getEventsUpcomingEvent.fulfilled, (state, action) => {
      const { payload } = action;
      addToData(payload.data, state);
      state.upcomingEvent.ids = payload.data.map((event) => event._id);
    });
    builder.addCase(
      getSignedUpEventsUpcomingEvent.fulfilled,
      (state, action) => {
        const { payload } = action;
        addToData(payload.data, state);
        state.upcomingEvent.ids = payload.data.map(
          (event) => event._id,
        );
      },
    );
    builder.addCase(getEvent.fulfilled, (state, action) => {
      const { payload } = action;
      state.form = payload;
    });
    builder.addCase(getEvent.rejected, (state) => {
      state.form = null;
    });
    builder.addCase(getEvent.pending, (state) => {
      state.form = null;
    });
    builder.addCase(createEvent.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(createEvent.pending, (state) => {
      state.status = 'fetching';
    });
    builder.addCase(createEvent.fulfilled, (state) => {
      state.status = 'fulfilled';
    });
    builder.addCase(editEvent.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(editEvent.pending, (state) => {
      state.status = 'fetching';
    });
    builder.addCase(editEvent.fulfilled, (state) => {
      state.status = 'fulfilled';
    });
    builder.addCase(getAllEvents.pending, (state) => {
      state.events = [];
    });
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.events = action.payload.data;
    });
    builder.addCase(getAllEvents.rejected, (state) => {
      state.events = [];
    });
    builder.addCase(deleteSignUp.fulfilled, (state, action) => {
      const { meta } = action;
      // remove volunteerId from one of the roles of the event
      if (state.data[meta.arg.eventId]) {
        const roleSignedUpFor = state.data[
          meta.arg.eventId
        ].roles.find((role) => role.volunteers.includes(meta.arg.userId));
        if (roleSignedUpFor) {
          roleSignedUpFor.volunteers = roleSignedUpFor.volunteers.filter(
            (vol) => vol != meta.arg.userId,
          );
        }
      }
    });
  },
});

export default eventSlice.reducer;
export const { resetEventStatus } = eventSlice.actions;
