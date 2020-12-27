import { createSlice } from '@reduxjs/toolkit';
import { getEvents, getSignedUpEvents } from '@redux/actions/event';
import { EventData } from 'types/event';

export type EventState = {
  data: Record<string, EventData>;
}

const initialState: EventState = {
  data: {},
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit
    builder.addCase(getEvents.pending, (state) => {

    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      const { payload } = action;
      // normalize from array to object structure
      payload.data.forEach(event => state.data[event._id] = {
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        deadline: new Date(event.deadline),
      });
    });
    builder.addCase(getEvents.rejected, (state) => {
    });

    builder.addCase(getSignedUpEvents.pending, (state) => {

    });
    builder.addCase(getSignedUpEvents.fulfilled, (state, action) => {
      const { payload } = action;
      // normalize from array to object structure
      payload.data.forEach(event => state.data[event._id] = {
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        deadline: new Date(event.deadline),
      });
    });
    builder.addCase(getSignedUpEvents.rejected, (state) => {
    });

  },
});

export default eventSlice.reducer;
