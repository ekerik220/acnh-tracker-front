const popupDataReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_POPUP_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default popupDataReducer;
