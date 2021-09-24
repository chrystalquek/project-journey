import { getEvent } from "@redux/actions/event";
import { getVolunteer } from "@redux/actions/volunteer/index";
import { createSlice } from "@reduxjs/toolkit";

export type LoadingStatus = "idle" | "loading" | "succeeded" | "failed";

export type LoadingState = {
  status: LoadingStatus;
};

const initialState: LoadingState = {
  status: "idle",
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    reset(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVolunteer.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getEvent.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { reset } = loadingSlice.actions;
export default loadingSlice.reducer;
