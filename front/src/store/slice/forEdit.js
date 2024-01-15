import { createSlice } from '@reduxjs/toolkit';

const forEditSlice = createSlice({
    name: 'forEdit',
    initialState: {
        edit: false,
    },
    reducers: {
        changeEdit: (state, action) => {
            state.edit = action.payload.edit;
        },
    },
});

export const { changeEdit } = forEditSlice.actions;
export const getEdit = (state) => state.forEditSlice.edit;
export default forEditSlice.reducer;
