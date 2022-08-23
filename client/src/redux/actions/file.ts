import { createAsyncThunk } from "@reduxjs/toolkit";
import { UploadFileRequest } from "@api/request";
import apiClient from "@api/apiClient";

export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async (request: UploadFileRequest) => {
    const response = await apiClient.uploadFile(request);
    return response;
  }
);
