import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '@redux/reducers/user';
import EventReducer from '@redux/reducers/event';
import imageReducer from '@redux/reducers/image';
import volunteerReducer from '@redux/reducers/volunteer/index';
import profilePageReducer from '@redux/reducers/profilePage';
import loadingReducer from '@redux/reducers/loading';
import storage from 'redux-persist/lib/storage';
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
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import pendingVolunteerReducer from './reducers/volunteer';
import signUpReducer from './reducers/signUp';
import formReducer from './reducers/form';
import commitmentApplicationReducer from './reducers/commitmentApplication';

export type StoreState = ReturnType<typeof reducers>

const reducers = combineReducers({
  user: userReducer,
  event: EventReducer,
  volunteer: volunteerReducer,
  pendingVolunteer: pendingVolunteerReducer,
  signUp: signUpReducer,
  form: formReducer,
  commitmentApplication: commitmentApplicationReducer,
  image: imageReducer,
  profilePage: profilePageReducer,
  loading: loadingReducer,
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
  middleware: (getDefaultMiddleware) => (process.env.NODE_ENV === 'development' ? getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }) : getDefaultMiddleware()),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default { store, persistor };
