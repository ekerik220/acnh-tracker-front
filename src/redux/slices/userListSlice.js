import { createSlice } from '@reduxjs/toolkit'

const userListSlice = createSlice({
    name: 'userList',
    initialState: [],
    reducers: {
        setUserList: (state, action) => action.payload,
    }
});

export const { setUserList } = userListSlice.actions;

export default userListSlice.reducer;