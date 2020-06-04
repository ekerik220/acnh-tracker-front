import { createSlice } from '@reduxjs/toolkit'

const selectedItemTypeSlice = createSlice({
    name: 'selectedItemType',
    initialState: null,
    reducers: {
        setSelectedItemType: (state, action) => action.payload,
    }
});

export const { setSelectedItemType } = selectedItemTypeSlice.actions;

export default selectedItemTypeSlice.reducer;