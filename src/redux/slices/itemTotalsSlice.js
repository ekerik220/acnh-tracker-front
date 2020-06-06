import { createSlice } from "@reduxjs/toolkit";
import { getItemTotals } from "api/backend";

const itemTotalsSlice = createSlice({
  name: "itemTotals",
  initialState: {
    totals: {},
    error: null,
  },
  reducers: {
    getItemTotalsSuccess: (state, action) => {
      state.totals = action.payload;
      state.error = null;
    },
    getItemTotalsFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getItemTotalsFailed,
  getItemTotalsSuccess,
} = itemTotalsSlice.actions;

export default itemTotalsSlice.reducer;

export const fetchItemTotals = () => (dispatch) => {
  return getItemTotals().then(
    (itemTotals) => dispatch(getItemTotalsSuccess(itemTotals)),
    (err) => dispatch(getItemTotalsFailed(err.toString()))
  );
};
