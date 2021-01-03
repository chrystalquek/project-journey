import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createEvent, getEventsUpcomingEvent, getSignedUpEventsUpcomingEvent } from '@redux/actions/event';

import { EventData } from 'types/event';
import UpcomingEvent from '@components/home/UpcomingEvent';

export type EventState = {
  data: Record<string, EventData>;
  upcomingEvent: {
    ids: Array<string> // if admin, all events. if volunteer, signed up events.
  }
}

const initialState: EventState = {
  data: {},
  upcomingEvent: {
    ids: []
  }
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit
    builder.addCase(getEventsUpcomingEvent.fulfilled, (state, action) => {
      const { payload } = action;
      // normalize from array to object structure
      payload.data.forEach(event => state.data[event._id] = {
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        deadline: new Date(event.deadline),
      });
      state.upcomingEvent.ids = payload.data.map(event => event._id)
    });
    builder.addCase(getSignedUpEventsUpcomingEvent.fulfilled, (state, action) => {
      const { payload } = action;
      // normalize from array to object structure
      payload.data.forEach(event => state.data[event._id] = {
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        deadline: new Date(event.deadline),
      });
      state.upcomingEvent.ids = payload.data.map(event => event._id)
    });

    builder.addCase(createEvent.pending, (state) => {
      // set loading
    });

    builder.addCase(createEvent.fulfilled, (state, action) => {

    });

    builder.addCase(createEvent.rejected, (state) => { });
  },
});

export default eventSlice.reducer;
