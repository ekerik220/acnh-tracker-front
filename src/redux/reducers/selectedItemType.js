const selectedItemTypeReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_SELECTED_ITEM_TYPE":
      return action.payload;
    default:
      return state;
  }
};

export default selectedItemTypeReducer;
