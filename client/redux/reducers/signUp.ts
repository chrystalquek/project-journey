import { createSlice } from '@reduxjs/toolkit';
import { getSignUps } from '@redux/actions/signUp';
import { SignUpData } from 'types/signUp';

export type SignUpState = {
  data: Record<string, SignUpData>;
}

const initialState: SignUpState = {
  data: {},
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Simplify immutable updates with redux toolkit
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-toolkit
    builder.addCase(getSignUps.pending, (state) => {

    });
    builder.addCase(getSignUps.fulfilled, (state, action) => {
      const { payload } = action;
      // normalize from array to object structure
      payload.data.forEach(signUp => state.data[signUp._id] = signUp)
    });
    builder.addCase(getSignUps.rejected, (state) => {
    });
  },
});

export default signUpSlice.reducer;
