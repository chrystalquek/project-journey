import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postEvent } from '@redux/actions/event';

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
    builder.addCase(postEvent.pending, (state) => {
      // set loading
    });

    builder.addCase(postEvent.fulfilled, (state, action) => {

    });

    builder.addCase(postEvent.rejected, (state) => {});
  },
});

export default eventSlice.reducer;
