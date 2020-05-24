import { combineReducers } from "redux";
import sideNavOpen from "./sideNavOpen";
import itemData from "./itemData";
import selectedItemType from "./selectedItemType";
import loading from "./loading";

const allReducers = combineReducers({
  sideNavOpen,
  itemData,
  selectedItemType,
  loading,
});

export default allReducers;
