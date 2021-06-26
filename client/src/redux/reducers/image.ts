import { createSlice } from "@reduxjs/toolkit";
import { uploadImage } from "@redux/actions/image";

type FetchStatus = "fetching" | "fulfilled" | "rejected" | "";

export type ImageState = {
  coverImage: string;
  facilitatorPhoto: string;
  status: FetchStatus;
};

const initialState: ImageState = {
  coverImage: "",
  facilitatorPhoto: "",
  status: "",
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    resetImages(state) {
      state.coverImage = "";
      state.facilitatorPhoto = "";
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => {
      state.status = "fetching";
    });
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      const { payload } = action;
      state.status = "fulfilled";
      state[payload.name] = payload.url;
    });
    builder.addCase(uploadImage.rejected, (state) => {
      state.status = "rejected";
    });
  },
});
export const { resetImages } = imageSlice.actions;
export default imageSlice.reducer;
