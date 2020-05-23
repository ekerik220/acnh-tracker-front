const itemDataReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ITEM_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default itemDataReducer;
