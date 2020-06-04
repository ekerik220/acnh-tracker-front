import { createSlice } from '@reduxjs/toolkit'

const sideNavOpenSlice = createSlice({
    name: 'sideNavOpen',
    initialState: false,
    reducers: {
        setSideNavOpen: (state, action) => action.payload,
    }
});

export const { setSideNavOpen } = sideNavOpenSlice.actions;

export default sideNavOpenSlice.reducer;