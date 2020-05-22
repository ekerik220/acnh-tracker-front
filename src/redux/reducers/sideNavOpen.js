const sideNavOpenReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_SIDE_NAV_OPEN":
      return action.payload;
    default:
      return state;
  }
};

export default sideNavOpenReducer;
