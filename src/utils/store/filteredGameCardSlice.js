import { createSlice } from "@reduxjs/toolkit";

const filteredGameCardSlice = createSlice({
  name: "filteredGameCard",
  initialState: null,
  reducers: {
    loadFilteredGameSlice: (state, action) => {
      // console.log("payload: ", action.payload);
      return action.payload;
    },
    unloadFilteredGameSlice: () => {
      return null;
    },
  },
});

export const { loadFilteredGameSlice, unloadFilteredGameSlice } =
  filteredGameCardSlice.actions;
export default filteredGameCardSlice.reducer;
