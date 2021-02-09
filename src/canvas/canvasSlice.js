import { createSlice } from "@reduxjs/toolkit";
import { v1 as uuidv1 } from "uuid";

/**
 * This reducer/state will hold on the content placed on the canvas and will
 * allow us to under/redo it
 */
const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    lines: [],
    notes: [],
  },
  reducers: {
    setLines(state, action) {
      return {
        ...state,
        lines: action.payload,
      };
    },
    addLine(state, action) {
      return {
        ...state,
        lines: [...state.lines, action.payload],
      };
    },
    addNote(state, action) {
      /**
       * mark any previous selected notes as false
       */
      const deselected = state.notes.map((n) => {
        n.selected = false;
        return n;
      });

      action.payload.id = uuidv1();
      state.notes = [...deselected, action.payload];
    },
    updateNote(state, action) {
      /**
       * mark any previous selected notes as false
       * and remove note with matching ID because it will be replaced
       */
      state.notes = state.notes.map((n) => {
        n.selected = false;
        if (n.id === action.payload.id) {
          return action.payload;
        }
        return n;
      });
    },
  },
});

export const { setLines, addLine, updateNote, addNote } = canvasSlice.actions;

export const selectLines = (state) => state.canvas.present.lines;

export default canvasSlice.reducer;
