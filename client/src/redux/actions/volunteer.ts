// TDOO remove file after refactor event volunteers

import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@api/apiClient";
import { GetVolunteersByIdRequest } from "@api/request";

export const getVolunteersById = createAsyncThunk(
  "volunteer/getVolunteersById",
  async (request: GetVolunteersByIdRequest) => {
    const response = await apiClient.getVolunteersById(request);
    return response;
  }
);
