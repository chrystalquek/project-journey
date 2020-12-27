import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer, { UserState } from '@redux/reducers/user';
import volunteerReducer, { VolunteerState } from '@redux/reducers/volunteer';
import eventReducer, { EventState } from './reducers/event';
import signUpReducer, { SignUpState } from './reducers/signUp';

export type StoreState = {
  user: UserState
  volunteer: VolunteerState
  event: EventState
  signUp: SignUpState
}

const reducer = {
  user: userReducer,
  volunteer: volunteerReducer,
  event: eventReducer,
  signUp: signUpReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
