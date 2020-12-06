import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './user';

const reducer = {
  user: userReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
