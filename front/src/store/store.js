import { configureStore } from '@reduxjs/toolkit'
import loginSlice from "./slice/login"
import tokenSlice from "./slice/token"

export const store = configureStore({
  reducer: {
    loginSlice,
    tokenSlice
  },
})