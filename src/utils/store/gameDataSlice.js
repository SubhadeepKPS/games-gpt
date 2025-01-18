import { createSlice } from "@reduxjs/toolkit";

const gameDataSlice = createSlice({
  name: "gameInfo",
  initialState: null,
  reducers: {
    addGameInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const { addGameInfo } = gameDataSlice.actions;
export default gameDataSlice.reducer;
