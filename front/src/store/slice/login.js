import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name : "login",
    initialState : {
        value : JSON.parse(localStorage.getItem("login")) || false,
    },
    reducers : {
        changeIsLogin(state, {payload}){
            state.value =  payload.login
            localStorage.setItem("login", JSON.stringify(state.value))
        }
    }
})

export const getLogin = (store) => store.loginSlice.value

export const {changeIsLogin} = loginSlice.actions

export default loginSlice.reducer