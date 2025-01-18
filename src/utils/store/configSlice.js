import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    language: "eng",
  },
  reducers: {
    alterLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { alterLanguage } = configSlice.actions;
export default configSlice.reducer;
