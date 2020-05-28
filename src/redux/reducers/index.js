import { combineReducers } from "redux";
import sideNavOpen from "./sideNavOpen";
import itemData from "./itemData";
import selectedItemType from "./selectedItemType";
import loading from "./loading";
import loginToken from "./loginToken";

const allReducers = combineReducers({
  sideNavOpen,
  itemData,
  selectedItemType,
  loading,
  loginToken,
});

export default allReducers;
