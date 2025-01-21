import { createSlice } from "@reduxjs/toolkit";

const gptResponseSelectionSlice = createSlice({
  name: "gptResponseSelection",
  initialState: {
    gameOnPage: null,
    gameDetailOnPage: null,
  },
  reducers: {
    loadGameOnPage: (state, action) => {
      // console.log("gamePayload: ", action.payload);
      state.gameOnPage = action.payload;
    },
    loadDetailOnPage: (state, action) => {
      state.gameDetailOnPage = action.payload;
    },
  },
});

export const { loadGameOnPage, loadDetailOnPage } =
  gptResponseSelectionSlice.actions;
export default gptResponseSelectionSlice.reducer;
