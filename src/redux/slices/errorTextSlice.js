import { createSlice } from '@reduxjs/toolkit'

const errorTextSlice = createSlice({
    name: 'errorText',
    initialState: null,
    reducers: {
        setErrorText: (state, action) => action.payload,
    }
});

export const { setErrorText } = errorTextSlice.actions;

export default errorTextSlice.reducer;