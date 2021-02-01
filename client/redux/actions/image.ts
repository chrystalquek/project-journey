import { createAsyncThunk } from '@reduxjs/toolkit';
import { UploadImageRequest, UploadImageRequestWithField } from '@utils/api/request';
import { UploadImageResponse } from '@utils/api/response';
import apiClient from '@utils/api/apiClient';
import { VolunteerData } from '@type/volunteer';

export const uploadImage = createAsyncThunk<UploadImageResponse,
UploadImageRequestWithField, { state }>(
  'image/uploadImage',
  async ({ name, form }) => {
    const response = await apiClient.uploadImage(form);
    return { name, url: response.url };
  },
);

export const updateProfilePicture = createAsyncThunk<
  VolunteerData,
  UploadImageRequest
>(
  'image/updateProfilePicture',
  async (form) => {
    const response = await apiClient.updateProfilePicture(form);
    return response;
  },
);

export default { uploadImage, updateProfilePicture };
