import { createSlice } from "@reduxjs/toolkit";

import { POINTER } from "features/tools/constants";

const toolSlice = createSlice({
  name: "tool",
  initialState: {
    cursor: POINTER,
    draw: {
      thickness: 5,
      color: "#FF6900",
    },
  },
  reducers: {
    setTool(state, action) {
      state.cursor = action.payload;
    },
    setDrawColor(state, action) {
      state.draw.color = action.payload;
    },
    setDrawThickness(state, action) {
      state.draw.thickness = action.payload;
    },
    incrementThickness(state) {
      if (state.draw.thickness === 40) return;
      state.draw.thickness = state.draw.thickness + 1;
    },
    decrementThickness(state) {
      if (state.draw.thickness === 1) return;
      state.draw.thickness = state.draw.thickness - 1;
    },
  },
});

export const {
  setTool,
  setDrawColor,
  setDrawThickness,
  incrementThickness,
  decrementThickness,
} = toolSlice.actions;

export default toolSlice.reducer;
