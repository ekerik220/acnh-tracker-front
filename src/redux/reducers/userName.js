const userNameReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER_NAME":
      return action.payload;
    default:
      return state;
  }
};

export default userNameReducer;
