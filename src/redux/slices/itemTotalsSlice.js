import { createSlice } from '@reduxjs/toolkit'

const itemTotalsSlice = createSlice({
    name: 'itemTotals',
    initialState: null,
    reducers: {
        setItemTotals: (state, action) => action.payload,
    }
});

export const { setItemTotals } = itemTotalsSlice.actions;

export default itemTotalsSlice.reducer;