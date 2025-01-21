import { createSlice } from "@reduxjs/toolkit";

const filterParamSlice = createSlice({
  name: "filterParam",
  initialState: [],
  reducers: {
    updateFilterParam: (state, action) => {
      let index = state.indexOf(action.payload.toLowerCase());
      if (index > -1) {
        state.splice(index, 1);
      } else {
        state.push(action.payload.toLowerCase());
      }
    },
  },
});

export const { updateFilterParam } = filterParamSlice.actions;
export default filterParamSlice.reducer;
