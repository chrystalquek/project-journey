import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionReducer from "@redux/reducers/session";
import eventReducer from "@redux/reducers/event";
import volunteerReducer from "@redux/reducers/volunteer";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import signUpReducer from "./reducers/signUp";
import formReducer from "./reducers/form";
import commitmentApplicationReducer from "./reducers/commitmentApplication";

export type StoreState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  event: eventReducer,
  volunteer: volunteerReducer,
  signUp: signUpReducer,
  form: formReducer,
  commitmentApplication: commitmentApplicationReducer,
  session: sessionReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export type FetchStatus = "pending" | "fulfilled" | "rejected";
