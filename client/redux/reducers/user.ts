import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData } from '@type/volunteer';
import jwt from 'jsonwebtoken';
import user from '../actions/user';

export type UserState = {
  token: string,
  user: VolunteerData | null
}

const initialState: UserState = {
  token: '',
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser(state) {
      state.token = '';
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(user.pending, (state) => {
      state.token = '';
    });
    builder.addCase(user.fulfilled, (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      const userObj = jwt.decode(payload.token);
      state.user = {
        ...userObj,
        birthday: new Date(userObj.birthday),
        createdAt: new Date(userObj.createdAt),
      };
    });
    builder.addCase(user.rejected, (state) => {
      state.token = '';
    });
  },
});

export default userSlice.reducer;
