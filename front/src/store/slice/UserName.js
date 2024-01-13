import { createSlice } from "@reduxjs/toolkit";

const UserNameSlice = createSlice({
    name : "user",
    initialState : {
        value : JSON.parse(localStorage.getItem("user")) || "",
    },
    reducers : {
        changeUserName(state, {payload}){
            state.value =  payload.userName
            localStorage.setItem("user", JSON.stringify(state.value))
        }
    }
})

export const getuserName = (store) => store.UserNameSlice.value

export const {changeUserName} = UserNameSlice.actions

export default UserNameSlice.reducer