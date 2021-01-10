import { createAsyncThunk } from '@reduxjs/toolkit';
import { UploadImageRequest } from '@utils/api/request';
import { UploadImageResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';

export const uploadImage = createAsyncThunk<any, any, { state }>(
  'image/uploadImage',
  async ({ name, form }) => {
    const response = await apiClient.uploadImage(form as FormData) as UploadImageResponse;
    return { name, url: response.url };
  },
);

export default { uploadImage };
