import { createSlice } from "@reduxjs/toolkit";

const gameCartSlice = createSlice({
  name: "playLater",
  initialState: {
    playLater: [],
    replay: [],
    finished: [],
  },
  reducers: {
    addToPlayLater: (state, action) => {
      return state.playLater.push(action.payload);
    },
    addToReplay: (state, action) => {
      return state.replay.push(action.payload);
    },
    addToFinished: (state, action) => {
      return state.finished.push(action.payload);
    },
    removeFromPlayLater: (state) => {
      state.includes();
    },
    removeFromReplay: (state) => {
      state.includes();
    },
    removeFromFinished: (state) => {
      state.includes();
    },
  },
});

export const { addGameInPlayLater, removeGameFromPlayLater } =
  gameCartSlice.actions;
export default gameCartSlice.reducer;
