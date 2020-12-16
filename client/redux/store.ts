import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer, { UserState } from '@redux/reducers/user';
import AdminReducer, { AdminState } from "@redux/reducers/admin";

export type StoreState = {
  user: UserState
  admin: AdminState
}

const reducer = {
  user: userReducer,
  admin: AdminReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
