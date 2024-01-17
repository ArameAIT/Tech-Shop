import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: "cart",
    initialState: {
        value: JSON.parse(localStorage.getItem("Cart")) || [],
    },
    reducers: {
        changeCart(state, {payload}) {
            state.value = payload.cart;
            localStorage.setItem("Cart", JSON.stringify(state.value));
        },
    },
});


export const getCart = (store) => store.CartSlice.value;

export const { changeCart } = CartSlice.actions;

export default CartSlice.reducer;
