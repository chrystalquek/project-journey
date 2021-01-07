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
    builder.addCase(getEventFeedbackFormQuestions.fulfilled, (state, action) => {
      const { payload } = action;
      state.questions = payload;
    });
  },
});

export default formState.reducer;
