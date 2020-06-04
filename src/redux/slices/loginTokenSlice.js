import { createSlice } from '@reduxjs/toolkit'

const loginTokenSlice = createSlice({
    name: 'loginToken',
    initialState: null,
    reducers: {
        setLoginToken: (state, action) => action.payload,
    }
});

export const { setLoginToken } = loginTokenSlice.actions;

export default loginTokenSlice.reducer;