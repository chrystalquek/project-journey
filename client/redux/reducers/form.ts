import { getEventFeedbackFormQuestions } from '@redux/actions/form';
import { createSlice } from '@reduxjs/toolkit';
import { QuestionWithOptions } from '@type/form';

export type FormState = {
  questions: Array<QuestionWithOptions>
}

const initialState: FormState = {
  questions: [],
};

const formState = createSlice({
  name: 'form',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventFeedbackFormQuestions.pending, (state) => {
      state.questions = [];
    });
    builder.addCase(getEventFeedbackFormQuestions.fulfilled, (state, action) => {
      const { payload } = action;
      state.questions = payload.map((question) => ({
        ...question,
        displayText: [question.displayText],
      }));
    });
  },
});

export default formState.reducer;
