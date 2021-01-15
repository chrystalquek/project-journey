import { getVolunteerById } from "@redux/actions/profilePage";
import { updateVolunteer } from "@redux/actions/user";
import { createSlice } from "@reduxjs/toolkit";
import { VolunteerData } from "@type/volunteer";

export type ProfilePageState = {
  data: VolunteerData
}

const initialState:  ProfilePageState = {
  data: null
}

const profilePageDataSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(getVolunteerById.fulfilled, (state, action) => {
      state.data = action.payload 
    })
    builder.addCase(updateVolunteer.fulfilled, (state, action) => {
      const updatedVolunteerData = action.payload
      if (state?.data.email === updatedVolunteerData.email) {
        state.data = updatedVolunteerData
      }
    })
  }
})

export default profilePageDataSlice.reducer