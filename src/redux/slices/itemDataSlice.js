import { createSlice } from '@reduxjs/toolkit'

const itemDataSlice = createSlice({
    name: 'itemData',
    initialState: null,
    reducers: {
        setItemData: (state, action) => action.payload,
    }
});

export const { setItemData } = itemDataSlice.actions;

export default itemDataSlice.reducer;