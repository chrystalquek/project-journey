import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from 'api/apiClient';
import { AnswerFormQuestionsRequest, CreateFormQuestionsRequest } from 'api/request';
import { GetEventFeedbackQuestionsResponse } from 'api/response';

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

export const createForm = createAsyncThunk<void, CreateFormQuestionsRequest>(
  'form/createForm',
  async ({ eventId, questions }) => {
    const response = await apiClient.createForm({
      eventId, questions,
    });
    return response;
  }
)
