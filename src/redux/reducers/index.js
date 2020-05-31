import { combineReducers } from "redux";
import sideNavOpen from "./sideNavOpen";
import itemData from "./itemData";
import selectedItemType from "./selectedItemType";
import loading from "./loading";
import loginToken from "./loginToken";
import userName from "./userName";
import errorText from "./errorText";
import userList from "./userList";
import userWishlist from "./userWishlist";
import itemTotals from "./itemTotals";
import allData from "./allData";

const allReducers = combineReducers({
  sideNavOpen,
  itemData,
  selectedItemType,
  loading,
  loginToken,
  userName,
  errorText,
  userList,
  userWishlist,
  itemTotals,
  allData,
});

export default allReducers;
