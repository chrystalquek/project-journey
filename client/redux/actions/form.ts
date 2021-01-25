import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@utils/api/apiClient';
import { AnswerFormQuestionsRequest } from '@utils/api/request';
import { GetEventFeedbackQuestionsResponse } from '@utils/api/response';

export const getEventFeedbackFormQuestions = createAsyncThunk<
  GetEventFeedbackQuestionsResponse,
  { eventId },
  { state }
>(
  'form/getQuestions',
  async ({ eventId }) => {
    const response = await apiClient.getEventFeedbackQuestions(eventId);
    return response;
  },
);

export const submitEventFeedbackFormQuestions = createAsyncThunk<
void, AnswerFormQuestionsRequest>(
  'form/submitQuestions',
  async ({ eventId, answers }) => {
    const response = await apiClient.submitEventFeedback({
      eventId, answers,
    });
    return response;
  },
);
