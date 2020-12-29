import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostEventRequest } from '@utils/api/request';
import { PostEventResponse } from '@utils/api/response';

import apiClient from '../../api/apiClient';

export const postEvent = createAsyncThunk<PostEventResponse, PostEventRequest, {state}>(
  'event',
  async (data: PostEventRequest) => {
    console.log(data);
    const response = await apiClient.postEvent(data) as PostEventResponse;
    return response;
  },
);

export default postEvent;
