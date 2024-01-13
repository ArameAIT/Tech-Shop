import { createSlice } from "@reduxjs/toolkit";

const isAdminSlice = createSlice({
    name: "admin",
    initialState: {
        value: JSON.parse(localStorage.getItem("admin")) || false,
    },
    reducers: {
        changeIsAdmin(state, { payload }) {
            state.value = payload.isAdmin
            localStorage.setItem("admin", JSON.stringify(state.value))

        }
    }
})

export const getIsAdmin = (store) => store.isAdminSlice.value

export const { changeIsAdmin } = isAdminSlice.actions

export default isAdminSlice.reducer