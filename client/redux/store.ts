import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer, { UserState } from '@redux/reducers/user';
import AdminReducer, { AdminState } from '@redux/reducers/admin';
import volunteerReducer, { VolunteerState } from '@redux/reducers/volunteer';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export type StoreState = {
  user: UserState
  admin: AdminState
  volunteer: VolunteerState
}

const reducers = combineReducers({
  user: userReducer,
  admin: AdminReducer,
  volunteer: volunteerReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);
export default {
  store,
  persistor,
};
