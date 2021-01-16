import { getVolunteerById } from "@redux/actions/profilePage"
import { createSlice } from "@reduxjs/toolkit"

export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type LoadingState = {
  status: LoadingStatus
}

const initialState: LoadingState = {
  status: 'idle'
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVolunteerById.rejected, (state) => {
      state.status = 'failed'
    })
  }
})

export default loadingSlice.reducer;