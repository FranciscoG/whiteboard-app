import { createSlice } from "@reduxjs/toolkit";

import { POINTER } from 'features/controls/constants';

const controlSlice = createSlice({
  name: "control",
  initialState: { cursor: POINTER },
  reducers: {
    setControl(state, action) {
      return {
        ...state,
        cursor: action.payload
      };
    },
  },
});

export const { setControl } = controlSlice.actions;

export default controlSlice.reducer;
