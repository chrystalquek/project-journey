import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "@redux/reducers/user";
import EventReducer from "@redux/reducers/event";
import volunteerReducer from "@redux/reducers/volunteer/index";
import profilePageReducer from "@redux/reducers/profilePage";
import loadingReducer from "@redux/reducers/loading";
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
import pendingRequestsVolunteerReducer from "./reducers/volunteer/pendingRequests";
import pendingRequestsEventReducer from "./reducers/event/pendingRequests";
import pendingApprovalReducer from "./reducers/home/pendingApproval";
import pendingRequestsTabsReducer from "./reducers/common/pendingRequestsTabs";

export type StoreState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  home: combineReducers({
    pendingApproval: pendingApprovalReducer,
  }),

  event: combineReducers({
    event: EventReducer,
    pendingRequests: pendingRequestsEventReducer,
  }),

  volunteer: combineReducers({
    index: volunteerReducer,
    pendingRequests: pendingRequestsVolunteerReducer,
  }),

  common: combineReducers({
    pendingRequestsTabs: pendingRequestsTabsReducer,
  }),

  signUp: signUpReducer,
  form: formReducer,
  commitmentApplication: commitmentApplicationReducer,
  profilePage: profilePageReducer,
  user: userReducer,
  loading: loadingReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "development"
      ? getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        })
      : getDefaultMiddleware(),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export type FetchStatus = "pending" | "fulfilled" | "rejected";

export default { store, persistor };
