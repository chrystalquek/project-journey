import { createAsyncThunk } from '@reduxjs/toolkit';
import { UploadImageRequest } from '@utils/api/request';
import { UploadImageResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';

export const uploadImage = createAsyncThunk<UploadImageResponse, UploadImageRequest, { state }>(
  'image/uploadImage',
  async (data: UploadImageRequest) => {
    const response = await apiClient.uploadImage(data) as UploadImageResponse;
    return response;
  },
);

export default { uploadImage };
