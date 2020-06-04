import { createSlice } from '@reduxjs/toolkit'

const allDataSlice = createSlice({
    name: 'allData',
    initialState: null,
    reducers: {
        setAllData: (state, action) => action.payload,
    }
});

export const { setAllData } = allDataSlice.actions;

export default allDataSlice.reducer;