import { createSlice } from "@reduxjs/toolkit";
import { getAllData } from "api/backend";

const allDataSlice = createSlice({
  name: "allData",
  initialState: {
    list: null,
    error: null,
  },
  reducers: {
    getAllDataSuccess: (state, action) => {
      state.list = action.payload;
      state.error = null;
    },
    getAllDataFailed: (state, action) => {
      state.error = action.payload;
    },
    resetAllDataError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getAllDataSuccess,
  getAllDataFailed,
  resetAllDataError,
} = allDataSlice.actions;

export default allDataSlice.reducer;

export const fetchAllData = () => (dispatch) => {
  return getAllData().then(
    (data) => {
      if (data.error) dispatch(getAllDataFailed(data.error));
      else dispatch(getAllDataSuccess(data));
    },
    (err) => dispatch(getAllDataFailed(err.toString()))
  );
};
