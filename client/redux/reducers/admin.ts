import { createSlice } from '@reduxjs/toolkit';
import { EventData } from "@type/event";
import { getAdminEvents } from "@redux/actions/admin";

export type AdminState = {
  adminEvents: Array<EventData>
}

const initialState: AdminState = {
  adminEvents: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdminEvents.pending, (state) => {
      state.adminEvents = [];
    });
    builder.addCase(getAdminEvents.fulfilled, (state, action) => {
      console.log(action.payload.events)
      state.adminEvents = action.payload.events;
    });
    builder.addCase(getAdminEvents.rejected, (state) => {
      state.adminEvents = [];
    });
  }
});

export default adminSlice.reducer;