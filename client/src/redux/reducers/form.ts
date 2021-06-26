import { getEventFeedbackFormQuestions } from "@redux/actions/form";
import { createSlice } from "@reduxjs/toolkit";
import { QuestionList } from "@type/form/form";

export type FormState = {
  questions: QuestionList;
};

const initialState: FormState = {
  questions: [],
};

const formState = createSlice({
  name: "form",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventFeedbackFormQuestions.pending, (state) => {
      state.questions = [];
    });
    builder.addCase(
      getEventFeedbackFormQuestions.fulfilled,
      (state, action) => {
        const { payload } = action;
        state.questions = payload;
      }
    );
  },
});

export default formState.reducer;
