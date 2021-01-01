import { createSlice } from '@reduxjs/toolkit';
import { EventData } from '@type/event';
import { getAllEvents } from '@redux/actions/event';

export type EventState = {
  events: Array<EventData>
}

const initialState: EventState = {
  events: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEvents.pending, (state) => {
      state.events = [];
    });
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.events = action.payload.data;
    });
    builder.addCase(getAllEvents.rejected, (state) => {
      state.events = [];
    });
  },
});

export default eventSlice.reducer;
