const loginTokenReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_LOGIN_TOKEN":
      return action.payload;
    default:
      return state;
  }
};

export default loginTokenReducer;
