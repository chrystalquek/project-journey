import { createSlice } from '@reduxjs/toolkit';
import user from '../actions/user';

export type User = {
  token: string
}

const initialState: User = {
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
    });
    builder.addCase(user.rejected, (state) => {
      state.token = '';
    });
  },
});

export default userSlice.reducer;
