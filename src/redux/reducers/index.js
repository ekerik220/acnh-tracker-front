import { combineReducers } from "redux";
import sideNavOpen from "./sideNavOpen";
import itemData from "./itemData";
import selectedItemType from "./selectedItemType";
import loading from "./loading";
import loginToken from "./loginToken";
import userName from "./userName";
import errorText from "./errorText";

const allReducers = combineReducers({
  sideNavOpen,
  itemData,
  selectedItemType,
  loading,
  loginToken,
  userName,
  errorText,
});

export default allReducers;
