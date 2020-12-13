import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer, { UserState } from './user';
import volunteerReducer, { VolunteerState } from './volunteer';

export type StoreState = {
  user: UserState
  volunteer: VolunteerState
}

const reducer = {
  user: userReducer,
  volunteer: volunteerReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
