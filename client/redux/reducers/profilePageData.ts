import { createSlice } from "@reduxjs/toolkit";
import { VolunteerData } from "@type/volunteer";

const initialState: VolunteerData = null

const profilePageDataSlice = createSlice({
  name: 'profilePageData',
  initialState,
  reducers:{},
  extraReducers: (builder) => {

  }
})

export default profilePageDataSlice.reducer