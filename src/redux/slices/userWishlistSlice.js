import { createSlice } from '@reduxjs/toolkit'

const userWishlistSlice = createSlice({
    name: 'userWishlist',
    initialState: [],
    reducers: {
        setUserWishlist: (state, action) => action.payload,
    }
});

export const { setUserWishlist } = userWishlistSlice.actions;

export default userWishlistSlice.reducer;