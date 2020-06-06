import { combineReducers } from "@reduxjs/toolkit";
import sideNavOpen from "./sideNavOpenSlice";
import itemData from "./itemDataSlice";
import selectedItemType from "./selectedItemTypeSlice";
import loading from "./loadingSlice";
import loginToken from "./loginTokenSlice";
import user from "./userSlice";
import errorText from "./errorTextSlice";
import itemTotals from "./itemTotalsSlice";
import allData from "./allDataSlice";
import popupData from "./popupDataSlice";

const allReducers = combineReducers({
  allData,
  errorText,
  sideNavOpen,
  itemData,
  selectedItemType,
  loading,
  loginToken,
  user,
  itemTotals,
  popupData,
});

export default allReducers;

export { fetchAllData, resetAllDataError } from "./allDataSlice";
export { setErrorText } from "./errorTextSlice";
export { setItemData } from "./itemDataSlice";
export { fetchItemTotals } from "./itemTotalsSlice";
export { setLoading } from "./loadingSlice";
export { login, logout, resetLoginError } from "./loginTokenSlice";
export { setPopupData } from "./popupDataSlice";
export { setSelectedItemType } from "./selectedItemTypeSlice";
export { setSideNavOpen } from "./sideNavOpenSlice";
export {
  fetchUser,
  addItemToUserList,
  addItemToUserWishlist,
  removeItemFromUserList,
  removeItemFromUserWishlist,
  resetUserError,
} from "./userSlice";
