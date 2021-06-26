import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@api/apiClient";

export const getVolunteerById = createAsyncThunk(
  "profilePageData/getVolunteerById",
  async (_id: string) => {
    const response = await apiClient.getVolunteer({ _id });
    return response;
  }
);
