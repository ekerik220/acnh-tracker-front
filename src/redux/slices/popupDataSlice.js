import { createSlice } from "@reduxjs/toolkit";

const popupDataSlice = createSlice({
  name: "popupData",
  initialState: null,
  reducers: {
    setPopupData: (state, action) => action.payload,
  },
});

export const { setPopupData } = popupDataSlice.actions;

export default popupDataSlice.reducer;
