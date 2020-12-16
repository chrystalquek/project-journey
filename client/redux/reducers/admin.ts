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
    })
      .addCase(getAdminEvents.fulfilled, (state, action) => {
        const { payload } = action;
        state.adminEvents = payload;
      })
      .addCase(getAdminEvents.rejected, (state) => {
        state.adminEvents = [];
      });
  }
});

export default adminSlice.reducer;