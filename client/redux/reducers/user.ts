import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData } from 'types/volunteer';
import user from '../actions/user';
import jwt from 'jsonwebtoken';
import { dummyUser } from 'dummy/user';

export type UserState = {
  token: string,
  user: VolunteerData
}

const initialState: UserState = {
  token: '',
  user: dummyUser, // to make testing easier
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
      const user = jwt.decode(payload.token)
      state.user = {
        ...user,
        birthday: new Date(user.birthday),
        createdAt: new Date(user.createdAt),
      }
    });
    builder.addCase(user.rejected, (state) => {
      state.token = '';
    });
  },
});

export default userSlice.reducer;
