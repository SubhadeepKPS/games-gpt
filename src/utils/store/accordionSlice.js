import { createSlice } from "@reduxjs/toolkit";

const accordionSlice = createSlice({
  name: "accordionInfo",
  initialState: {
    accordionNames: ["Genre", "Platform"],
    openAccordionName: "Genre",
    openAccordionValues: {
      genre: [
        "action",
        "action RPG",
        "battle Royale",
        "card Game",
        "fantasy",
        "fighting",
        "MMO",
        "mmorpg",
        "moba",
        "shooter",
        "strategy",
        "racing",
        "social",
        "sports",
      ],
      platform: ["PC (Windows)", "Web Browser"],
    },
  },
  reducers: {
    updateOpenAccordionName: (state, action) => {
      state.openAccordionName = action.payload;
    },
    closeAccordion: (state) => {
      state.openAccordionName = null;
    },
  },
});

export const { updateOpenAccordionName, closeAccordion } =
  accordionSlice.actions;
export default accordionSlice.reducer;
