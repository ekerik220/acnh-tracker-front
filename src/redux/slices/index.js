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

export { setAllData } from "./allDataSlice";
export { setErrorText } from "./errorTextSlice";
export { setItemData } from "./itemDataSlice";
export { setItemTotals } from "./itemTotalsSlice";
export { setLoading } from "./loadingSlice";
export { setLoginToken } from "./loginTokenSlice";
export { setPopupData } from "./popupDataSlice";
export { setSelectedItemType } from "./selectedItemTypeSlice";
export { setSideNavOpen } from "./sideNavOpenSlice";
export {
  fetchUser,
  addItemToUserList,
  addItemToUserWishlist,
  removeItemFromUserList,
  removeItemFromUserWishlist,
} from "./userSlice";
