import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer, { UserState } from '@redux/reducers/user';
import AdminReducer, { AdminState } from '@redux/reducers/admin';
import volunteerReducer, { VolunteerState } from '@redux/reducers/volunteer';

export type StoreState = {
  user: UserState
  admin: AdminState
  volunteer: VolunteerState
}

const reducer = {
  user: userReducer,
  admin: AdminReducer,
  volunteer: volunteerReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
