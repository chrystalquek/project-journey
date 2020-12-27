import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData } from 'types/volunteer';
import user from '../actions/user';
import jwt from 'jsonwebtoken';

export type UserState = {
  token: string,
  user?: VolunteerData
}

const initialState: UserState = {
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(user.pending, (state) => {
      state.token = '';
    });
    builder.addCase(user.fulfilled, (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      state.user = jwt.decode(payload.token)
    });
    builder.addCase(user.rejected, (state) => {
      state.token = '';
    });
  },
});

export default userSlice.reducer;
