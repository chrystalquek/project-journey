import { createSlice } from '@reduxjs/toolkit';
import { getEvent } from '@redux/actions/event';

import { EventData } from 'types/event';

export type EventState = {
  data: EventData | null;
}

const initialState: EventState = {
  data: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvent.pending, (state) => {
      state.data = null;
    });

    builder.addCase(getEvent.fulfilled, (state, action) => {
      const { payload } = action;
      state.data = payload;
    });
    builder.addCase(getEvent.rejected, (state) => {
      state.data = null;
    });
  },
});

export default eventSlice.reducer;
