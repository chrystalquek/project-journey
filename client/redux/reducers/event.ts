import { createSlice } from '@reduxjs/toolkit';
import {
  getUpcomingEvents,
  getEvent,
  editEvent,
  deleteEvent,
  createEvent,
  getEventsUpcomingEvent,
  getSignedUpEventsUpcomingEvent,
  getSignedUpEventsPastEvent,
  cancelEvent,
} from '@redux/actions/event';

import { EventData } from 'types/event';
import { deleteSignUp } from '@redux/actions/signUp';

type FetchStatus = 'fetching' | 'fulfilled' | 'rejected' | '';

export type EventState = {
  data: Record<string, EventData>;
  upcomingEvent: { // part of dashboard and events > pending requests
    ids: Array<string> // if admin, all events. if volunteer, signed up events.
  };
  pastEvents: {
    ids: Array<string>
  }
  browseEvents: {
    ids: Array<string>
  };
  form: EventData | null;
  status: FetchStatus;
}

const initialState: EventState = {
  data: {},
  upcomingEvent: {
    ids: [],
  },
  pastEvents: {
    ids: [],
  },
  browseEvents: {
    ids: [],
  },
  form: null,
  status: '',
};

// parse all Dates etc before saving to store
const addToData = (events: Array<EventData>, state: EventState) => {
  events?.forEach(
    (event) => (state.data[event._id] = {
      ...event,
      startDate: event.startDate,
      endDate: event.endDate,
      deadline: event.deadline,
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
    builder.addCase(
      getSignedUpEventsPastEvent.fulfilled,
      (state, action) => {
        const { payload } = action;
        addToData(payload.data, state);
        state.pastEvents.ids = payload.data.map(
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
    builder.addCase(cancelEvent.fulfilled, (state, { meta }) => {
      state.data[meta.arg].isCancelled = true;
    });
    builder.addCase(cancelEvent.rejected, (state, { meta }) => {
      state.data[meta.arg].isCancelled = false;
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
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      const { meta } = action;
      delete state.data[meta.arg];
    });
    builder.addCase(getUpcomingEvents.pending, (state) => {
      state.status = 'fetching';
      state.browseEvents.ids = [];
    });
    builder.addCase(getUpcomingEvents.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      addToData(action.payload?.data, state);
      state.browseEvents.ids = action.payload?.data?.map((event) => event._id);
      // hacky workaround to make create new event work
      state.status = '';
    });
    builder.addCase(getUpcomingEvents.rejected, (state) => {
      state.status = 'rejected';
      state.browseEvents.ids = [];
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
            (vol) => vol !== meta.arg.userId,
          );
        }
      }
    });
  },
});

export default eventSlice.reducer;
export const { resetEventStatus } = eventSlice.actions;
