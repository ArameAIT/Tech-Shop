import { configureStore } from '@reduxjs/toolkit'
import loginSlice from "./slice/login"
import tokenSlice from "./slice/token"
import isAdminSlice from "./slice/isAdmin"
import UserNameSlice from './slice/UserName'
import ProductsSlice from "./slice/products"

export const store = configureStore({
  reducer: {
    loginSlice,
    tokenSlice,
    isAdminSlice,
    UserNameSlice,
    ProductsSlice
  },
})