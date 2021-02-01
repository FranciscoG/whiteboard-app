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
      state.cursor = action.payload
    },
    setDrawColor(state, action) {
      state.draw.color = action.payload
    },
    setDrawThickness(state, action) {
      state.draw.thickness = action.payload
    },
  },
});

export const { setTool, setDrawColor, setDrawThickness } = toolSlice.actions;

export default toolSlice.reducer;
