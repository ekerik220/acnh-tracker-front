const allDataReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_ALL_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default allDataReducer;
