import { createCommitmentApplication } from '@redux/actions/commitmentApplication';
import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData } from '@type/volunteer';
import jwt from 'jsonwebtoken';
import apiClient from '@utils/api/apiClient';
import { REHYDRATE } from 'redux-persist';
import user, { updateVolunteer } from '../actions/user';

type FetchStatus = 'fetching' | 'fulfilled' | 'rejected' | '';

export type UserState = {
  token: string;
  user: VolunteerData | null;
  status: FetchStatus;
};

const initialState: UserState = {
  token: '',
  user: null,
  status: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser(state) {
      state.token = '';
      state.user = null;
      state.status = '';
    },
  },
  extraReducers: (builder) => {
    // Sets auth token from persisted state to runtime
    builder.addCase(REHYDRATE, (_, action) => {
      // @ts-ignore payload attribute not registered despite it available
      const authToken = action?.payload?.user?.token;
      if (authToken) { apiClient.setAuthToken(authToken); }
    });
    builder.addCase(user.pending, (state) => {
      state.token = '';
      state.status = 'fetching';
    });
    builder.addCase(user.fulfilled, (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      // Sets auth token for authorized endpoints
      apiClient.setAuthToken(payload.token);

      state.status = 'fulfilled';
      const userObj = jwt.decode(payload.token);
      state.user = {
        ...userObj,
        birthday: new Date(userObj.birthday),
        createdAt: new Date(userObj.createdAt),
      };
    });
    builder.addCase(user.rejected, (state) => {
      state.token = '';
      state.status = 'rejected';
    });
    builder.addCase(updateVolunteer.fulfilled, (state, action) => {
      const updatedVolunteerData = action.payload
      // Update the loggedInUser data
      if (state.user.email == updatedVolunteerData.email) {
        state.user = updatedVolunteerData
      }
    });
    builder.addCase(createCommitmentApplication.fulfilled, (state, action) => {
      state.user.commitmentApplicationIds.push(action.payload._id);
    });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
