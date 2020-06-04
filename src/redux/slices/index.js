import { combineReducers } from "@reduxjs/toolkit";
import sideNavOpen from "./sideNavOpenSlice";
import itemData from "./itemDataSlice";
import selectedItemType from "./selectedItemTypeSlice";
import loading from "./loadingSlice";
import loginToken from "./loginTokenSlice";
import userName from "./userNameSlice";
import errorText from "./errorTextSlice";
import userList from "./userListSlice";
import userWishlist from "./userWishlistSlice";
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
  userName,
  userList,
  userWishlist,
  itemTotals,
  popupData,
});

export default allReducers;

export {setAllData} from "./allDataSlice";
export {setErrorText} from "./errorTextSlice";
export {setItemData} from "./itemDataSlice";
export {setItemTotals} from "./itemTotalsSlice";
export {setLoading} from "./loadingSlice";
export {setLoginToken} from "./loginTokenSlice";
export {setPopupData} from "./popupDataSlice";
export {setSelectedItemType} from "./selectedItemTypeSlice";
export {setSideNavOpen} from "./sideNavOpenSlice";
export {setUserList} from "./userListSlice";
export {setUserName} from "./userNameSlice";
export {setUserWishlist} from "./userWishlistSlice";

