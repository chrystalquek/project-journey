import { createCommitmentApplication } from '@redux/actions/commitmentApplication';
import { createSlice } from '@reduxjs/toolkit';
import { VolunteerData } from '@type/volunteer';
import jwt from 'jsonwebtoken';
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
    builder.addCase(user.pending, (state) => {
      state.token = '';
      state.status = 'fetching';
    });
    builder.addCase(user.fulfilled, (state, action) => {
      const { payload } = action;
      state.token = payload.token;
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
      state.user = action.payload;
    });
    builder.addCase(createCommitmentApplication.fulfilled, (state, action) => {
      state.user.commitmentApplicationIds.push(action.payload._id)
    })
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
