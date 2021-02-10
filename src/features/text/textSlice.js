import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "text",
  initialState: { activeText: undefined },
  reducers: {
    setActiveText(state, action) {
      state.activeText = action.payload;
    },
    clearActiveText(state) {
      state.activeText = undefined;
    },
  },
});

export const { setActiveText, clearActiveText } = textSlice.actions;

export default textSlice.reducer;
