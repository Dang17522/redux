import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState = {
  value: 10,
  name: 'counter slice'
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += action.payload
    },
    reduce: (state, action) => {
      state.value -= action.payload
    }
  }
})

export const { increment, reduce} = counterSlice.actions

export default counterSlice.reducer