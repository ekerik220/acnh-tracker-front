const userWishlistReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_WISHLIST":
      return action.payload;
    default:
      return state;
  }
};

export default userWishlistReducer;
