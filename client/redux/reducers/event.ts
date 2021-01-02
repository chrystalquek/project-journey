import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createEvent } from '@redux/actions/event';

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
    builder.addCase(createEvent.pending, (state) => {
      // set loading
    });

    builder.addCase(createEvent.fulfilled, (state, action) => {

    });

    builder.addCase(createEvent.rejected, (state) => {});
  },
});

export default eventSlice.reducer;
