import apiClient from "@api/apiClient";
import { updateVolunteer } from "@redux/actions/volunteer";
import { createSlice } from "@reduxjs/toolkit";
import { VolunteerData } from "@type/volunteer";
import jwt from "jsonwebtoken";
import { REHYDRATE } from "redux-persist";
import { login } from "../actions/session";

export type SessionState = {
  token: string | null;
  user: VolunteerData | null;
};

const initialState: SessionState = {
  token: null,
  user: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logout(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      // @ts-ignore payload attribute not registered despite it available
      const authToken = action?.payload?.user?.token;
      if (authToken) {
        apiClient.setAuthToken(authToken);
      }
    });
    builder.addCase(login.pending, (state) => {
      state.token = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      apiClient.setAuthToken(payload.token);

      const userObj = jwt.decode(payload.token);
      state.user = userObj;
    });
    builder.addCase(login.rejected, (state) => {
      state.token = null;
      state.user = null;
    });
    builder.addCase(updateVolunteer.fulfilled, (state, action) => {
      const updatedVolunteerData = action.payload;
      // Update the loggedInUser data
      if (state.user?._id === updatedVolunteerData._id) {
        state.user = updatedVolunteerData;
      }
    });
  },
});

export const { logout } = sessionSlice.actions;
export default sessionSlice.reducer;
