import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counter/CounterSlice'

export const Store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    },
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch