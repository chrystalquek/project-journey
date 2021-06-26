import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@api/apiClient";
import {
  AnswerFormQuestionsRequest,
  CreateFormQuestionsRequest,
} from "@api/request";

export const createForm = createAsyncThunk(
  "form/createForm",
  async (request: CreateFormQuestionsRequest) => {
    const response = await apiClient.createForm(request);
    return response;
  }
);

export const getEventFeedbackFormQuestions = createAsyncThunk(
  "form/getQuestions",
  async (_id: string) => {
    const response = await apiClient.getEventFeedbackQuestions({ _id });
    return response;
  }
);

export const submitEventFeedbackFormQuestions = createAsyncThunk(
  "form/submitQuestions",
  async (request: AnswerFormQuestionsRequest) => {
    const response = await apiClient.submitEventFeedback(request);
    return response;
  }
);
