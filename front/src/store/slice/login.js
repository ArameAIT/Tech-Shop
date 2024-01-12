import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name : "login",
    initialState : {
        value : false,
    },
    reducers : {
        changeIsLogin(state, {payload}){
            state.value =  payload.login
        }
    }
})

export const getLogin = (store) => store.loginSlice.value

export const {changeIsLogin} = loginSlice.actions

export default loginSlice.reducer