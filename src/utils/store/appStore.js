import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import gameReducer from "./gameDataSlice";
import gameCartReducer from "./gameCartSlice";
import pageReducer from "./pageSlice";
import configReducer from "./configSlice";
import accordionReducer from "./accordionSlice";
import sortReducer from "./sortSlice";
import filterParamReducer from "./filterParamSlice";
import filteredGameCardReducer from "./filteredGameCardSlice";
import gptResponseSelectionReducer from "./gptResponseSelectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
    games: gameReducer,
    gameCart: gameCartReducer,
    config: configReducer,
    sortData: sortReducer,
    accordion: accordionReducer,
    filterParam: filterParamReducer,
    filteredGameCard: filteredGameCardReducer,
    gptResponseSelection: gptResponseSelectionReducer,
  },
});

export default appStore;
