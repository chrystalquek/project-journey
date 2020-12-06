import { createSlice } from '@reduxjs/toolkit';
import user from '../actions/user';

export type User = {
  name: string
  email: string
}

const initialState: User = {
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(user.pending, (state) => {
      state.name = '';
      state.email = '';
    });
    builder.addCase(user.fulfilled, (state, action) => {
      const { payload } = action;
      state = payload;
    });
    builder.addCase(user.rejected, (state) => {
      state.name = '';
      state.email = '';
    });
  },
});

export default userSlice.reducer;
