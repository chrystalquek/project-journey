import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer, { User } from './user';

export type StoreState = {
  user: User
}

const reducer = {
  user: userReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
