import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer, { UserState } from '@redux/reducers/user';
import EventReducer, { EventState } from '@redux/reducers/event';
import imageReducer, { ImageState } from '@redux/reducers/image';
import volunteerReducer, { VolunteerState } from '@redux/reducers/volunteer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import signUpReducer, { SignUpState } from './reducers/signUp';
import commitmentApplicationReducer, { CommitmentApplicationState } from './reducers/commitmentApplication';

export type StoreState = {
  user: UserState
  event: EventState
  volunteer: VolunteerState
  signUp: SignUpState
  commitmentApplication: CommitmentApplicationState,
  image: ImageState,
}

const reducers = combineReducers({
  user: userReducer,
  event: EventReducer,
  volunteer: volunteerReducer,
  signUp: signUpReducer,
  commitmentApplication: commitmentApplicationReducer,
  image: imageReducer,
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);
export default {
  store,
  persistor,
};
