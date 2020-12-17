import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer, { UserState } from '@redux/reducers/user';
import volunteerReducer, { VolunteerState } from '@redux/reducers/volunteer';

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
