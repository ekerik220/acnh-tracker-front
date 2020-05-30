const errorTextReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_ERROR_TEXT":
      return action.payload;
    default:
      return state;
  }
};

export default errorTextReducer;
