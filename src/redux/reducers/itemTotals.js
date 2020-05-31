const itemTotalsReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_ITEM_TOTALS":
      return action.payload;
    default:
      return state;
  }
};

export default itemTotalsReducer;
