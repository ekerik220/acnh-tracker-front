import { createSlice } from "@reduxjs/toolkit";
import {
  getUserInfo,
  addItemToList,
  removeItemFromList,
  addItemToWishlist,
  removeItemFromWishlist,
} from "api/backend";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: null,
    list: [],
    wishlist: [],
    error: null,
  },
  reducers: {
    getUserSuccess: (state, action) => {
      state.name = action.payload.name;
      state.list = action.payload.list;
      state.wishlist = action.payload.wishlist;
      state.error = null;
    },
    getUserFailed: (state, action) => {
      state.error = action.payload;
    },
    changeListSuccess: (state, action) => {
      state.list = action.payload.list;
      state.wishlist = action.payload.wishList;
      state.error = null;
    },
    changeListFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getUserSuccess,
  getUserFailed,
  changeListSuccess,
  changeListFailed,
} = userSlice.actions;

export default userSlice.reducer;

export const fetchUser = (token) => (dispatch) => {
  return getUserInfo(token).then(
    (userInfo) => {
      if (userInfo.error) dispatch(getUserFailed(userInfo.error));
      else dispatch(getUserSuccess(userInfo));
    },
    (err) => dispatch(getUserFailed(err.toString()))
  );
};

export const addItemToUserList = (loginToken, item) => (dispatch) => {
  return addItemToList(loginToken, item).then(
    (listInfo) => listChangeSuccessHandler(listInfo, dispatch),
    (err) => dispatch(changeListFailed(err.toString()))
  );
};

export const removeItemFromUserList = (loginToken, item) => (dispatch) => {
  return removeItemFromList(loginToken, item).then(
    (listInfo) => listChangeSuccessHandler(listInfo, dispatch),
    (err) => dispatch(changeListFailed(err.toString()))
  );
};

export const addItemToUserWishlist = (loginToken, item) => (dispatch) => {
  return addItemToWishlist(loginToken, item).then(
    (listInfo) => listChangeSuccessHandler(listInfo, dispatch),
    (err) => dispatch(changeListFailed(err.toString()))
  );
};

export const removeItemFromUserWishlist = (loginToken, item) => (dispatch) => {
  return removeItemFromWishlist(loginToken, item).then(
    (listInfo) => listChangeSuccessHandler(listInfo, dispatch),
    (err) => dispatch(changeListFailed(err.toString()))
  );
};

/*
 * Helper functions
 */
const listChangeSuccessHandler = (listInfo, dispatch) => {
  if (listInfo.error) dispatch(changeListFailed(listInfo.error));
  else dispatch(changeListSuccess(listInfo));
};
