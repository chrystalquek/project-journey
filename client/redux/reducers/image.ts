import { createSlice } from '@reduxjs/toolkit';
import { uploadImage } from '@redux/actions/image';

type FetchStatus = 'fetching' | 'fulfilled' | 'rejected' | '';

export type ImageState = {
    url: string;
    status: FetchStatus;
};

const initialState: ImageState = {
  url: '',
  status: '',
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => {
      state.url = '';
      state.status = 'fetching';
    });
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      const { payload } = action;
      state.url = payload.url;
      state.status = 'fulfilled';
    });
    builder.addCase(uploadImage.rejected, (state) => {
      state.url = '';
      state.status = 'rejected';
    });
  },
});

export default imageSlice.reducer;
