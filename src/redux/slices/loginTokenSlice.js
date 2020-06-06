import { createSlice } from "@reduxjs/toolkit";
import { handleLogin } from "api/backend";

const loginTokenSlice = createSlice({
  name: "loginToken",
  initialState: {
    token: null,
    error: null,
  },
  reducers: {
    getLoginTokenSuccess: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
    getLoginTokenFailure: (state, action) => {
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.error = null;
    },
    resetLoginError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getLoginTokenFailure,
  getLoginTokenSuccess,
  logout,
  resetLoginError,
} = loginTokenSlice.actions;

export default loginTokenSlice.reducer;

export const login = (email, password) => (dispatch) => {
  return handleLogin(email, password).then(
    (loginInfo) => {
      if (loginInfo.error) dispatch(getLoginTokenFailure(loginInfo.error));
      else dispatch(getLoginTokenSuccess(loginInfo.token));
    },
    (err) => dispatch(getLoginTokenFailure(err.toString()))
  );
};
