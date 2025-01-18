import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    page: "Browse",
  },
  reducers: {
    alterPage: (state, action) => {
      return action.payload;
    },
  },
});

export const { alterPage } = pageSlice.actions;
export default pageSlice.reducer;
