import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sortData",
  initialState: {
    sortParam: null,
    sortAllGames: false,
    sortFilteredGames: false,
    sortBoth: false,
  },
  reducers: {
    addSortParam: (state, action) => {
      state.sortParam = action.payload;
    },
    toggleSortAllGames: (state, action) => {
      state.sortAllGames = !state.sortAllGames;
    },
    toggleSortFilteredGames: (state, action) => {
      state.sortFilteredGames = !state.sortFilteredGames;
    },
    toggleSortBoth: (state, action) => {
      state.sortBoth = !state.sortBoth;
    },
  },
});

export const {
  addSortParam,
  toggleSortFilteredGames,
  toggleSortAllGames,
  toggleSortBoth,
} = sortSlice.actions;
export default sortSlice.reducer;
