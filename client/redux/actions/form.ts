import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@utils/api/apiClient';
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
