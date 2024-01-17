import { configureStore } from '@reduxjs/toolkit'
import loginSlice from "./slice/login"
import tokenSlice from "./slice/token"
import isAdminSlice from "./slice/isAdmin"
import UserNameSlice from './slice/UserName'
import ProductsSlice from "./slice/products"
import forEditSlice from './slice/forEdit'
import CartSlice from "./slice/cart"

export const store = configureStore({
  reducer: {
    loginSlice,
    tokenSlice,
    isAdminSlice,
    UserNameSlice,
    ProductsSlice,
    forEditSlice,
    CartSlice
  },
})