import { createSlice } from '@reduxjs/toolkit';
// Define the initial state using that type
const initialState: {
  mode: boolean,
  tabSelected: string
} = {
  mode: false,
  tabSelected: 'user'
}

export const AppSlice = createSlice({
  name: 'mode',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    changMode: (state, action) => {
      state.mode = action.payload;
    },
    changSelected: (state, action) => {
      state.tabSelected = action.payload
    }
  }, extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    
  },
})

export const { changMode, changSelected } = AppSlice.actions

export default AppSlice.reducer