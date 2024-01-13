import { createSlice } from "@reduxjs/toolkit";

const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        value: JSON.parse(localStorage.getItem("AProduct")) || [],
    },
    reducers: {
        changeProducts(state, {payload}) {
            state.value = payload.products;
            localStorage.setItem("AProducts", JSON.stringify(state.value));
        },
    },
});



export const getProducts = (store) => store.ProductsSlice.value;

export const { changeProducts } = ProductsSlice.actions;

export default ProductsSlice.reducer;
