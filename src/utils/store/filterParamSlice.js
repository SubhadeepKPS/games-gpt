import { createSlice } from "@reduxjs/toolkit";

const filterParamSlice = createSlice({
  name: "filterParam",
  initialState: [],
  reducers: {
    addFilterParam: (state, action) => {
      state.push(action.payload.toLowerCase());
    },
    removeFilterParam: (state, action) => {
      let index = state.indexOf(action.payload.toLowerCase());
      if (index > -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addFilterParam, removeFilterParam } = filterParamSlice.actions;
export default filterParamSlice.reducer;
