import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: { activeNote: undefined },
  reducers: {
    setActiveNote(state, action) {
      state.activeNote = action.payload
    },
    clearActiveNote(state) {
      state.activeNote = undefined
    } 
  },
});

export const { setActiveNote, clearActiveNote } = noteSlice.actions;

export default noteSlice.reducer;
