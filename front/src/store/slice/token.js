import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "token",
    initialState: {
        value: JSON.parse(localStorage.getItem("token")) || "",
    },
    reducers: {
        changeToken(state, { payload }) {
            state.value = payload.token
            localStorage.setItem("token", JSON.stringify(state.value))
        }
    }
})

export const getToken = (store) => store.tokenSlice.value

export const { changeToken } = tokenSlice.actions

export default tokenSlice.reducer