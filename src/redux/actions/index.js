export const setSideNavOpen = (state) => {
  return {
    type: "SET_SIDE_NAV_OPEN",
    payload: state,
  };
};

export const setItemData = (state) => {
  return {
    type: "SET_ITEM_DATA",
    payload: state,
  };
};

export const setSelectedItemType = (state) => {
  return {
    type: "SET_SELECTED_ITEM_TYPE",
    payload: state,
  };
};

export const setLoading = (state) => {
  return {
    type: "SET_LOADING",
    payload: state,
  };
};
