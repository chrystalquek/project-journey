import {
  createEntityAdapter,
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  createAndAcceptSignUp,
  createSignUp,
  deleteSignUp,
  getPendingSignUps,
  getSignUps,
  updateSignUp,
} from "@redux/actions/signUp";
import { SignUpData } from "@type/signUp";
import { FetchStatus, StoreState } from "@redux/store";
import { isDefined } from "@utils/helpers/typescript";

const signUpAdapter = createEntityAdapter<SignUpData>({
  selectId: (signUp) => signUp._id,
});

export type SignUpState = {
  listSignUpIds: string[];
  status: FetchStatus | null;
};

const initialState = signUpAdapter.getInitialState<SignUpState>({
  listSignUpIds: [],
  status: null,
});

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    resetSignUpStatus(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSignUps.fulfilled, (state, action) => {
      const payload = action.payload.data;
      signUpAdapter.upsertMany(state, payload);
      state.listSignUpIds = payload.map((signUp) => signUp._id);
    });
    builder.addCase(getPendingSignUps.fulfilled, (state, action) => {
      const payload = action.payload.data;
      signUpAdapter.upsertMany(state, payload);
      state.listSignUpIds = payload.map((signUp) => signUp._id);
    });
    builder.addCase(createAndAcceptSignUp.fulfilled, () => {
      window.location.reload();
    });
    builder.addCase(createAndAcceptSignUp.rejected, () => {
      window.location.reload();
    });
    builder.addCase(deleteSignUp.fulfilled, (state, action) => {
      signUpAdapter.removeOne(state, action.meta.arg.id);
    });
    builder.addMatcher(
      isAnyOf(updateSignUp.fulfilled),
      (state, { payload }) => {
        signUpAdapter.upsertOne(state, payload);
      }
    );
    builder.addMatcher(
      isPending(
        getSignUps,
        getPendingSignUps,
        createAndAcceptSignUp,
        createSignUp,
        deleteSignUp,
        updateSignUp
      ),
      (state) => {
        state.status = "pending";
      }
    );
    builder.addMatcher(
      isFulfilled(
        getSignUps,
        getPendingSignUps,
        createAndAcceptSignUp,
        createSignUp,
        deleteSignUp,
        updateSignUp
      ),
      (state) => {
        state.status = "fulfilled";
      }
    );
    builder.addMatcher(
      isRejected(
        getSignUps,
        getPendingSignUps,
        createAndAcceptSignUp,
        createSignUp,
        deleteSignUp,
        updateSignUp
      ),
      (state) => {
        state.status = "rejected";
      }
    );
  },
});

export default signUpSlice.reducer;

export const { resetSignUpStatus } = signUpSlice.actions;

export const { selectById: selectSignUpById, selectAll: selectAllSignUps } =
  signUpAdapter.getSelectors((state: StoreState) => state.signUp);

export const selectSignUpsByIds = (state: StoreState, ids: string[]) =>
  ids.map((id) => selectSignUpById(state, id)).filter(isDefined);
