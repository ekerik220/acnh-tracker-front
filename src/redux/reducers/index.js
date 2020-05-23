import { combineReducers } from "redux";
import sideNavOpen from "./sideNavOpen";
import itemData from "./itemData";

const allReducers = combineReducers({
  sideNavOpen,
  itemData,
});

export default allReducers;
