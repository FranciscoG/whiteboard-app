import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: { activeNote: undefined, newNote: undefined },
  reducers: {
    setActiveNote(state, action) {
      state.activeNote = action.payload;
    },
    clearActiveNote(state) {
      state.activeNote = undefined;
    },
    setNewNote(state, action) {
      state.newNote = action.payload;
    },
    clearNewNote(state) {
      state.newNote = undefined;
    },
  },
});

export const { setActiveNote, clearActiveNote, setNewNote, clearNewNote } = noteSlice.actions;

export default noteSlice.reducer;
