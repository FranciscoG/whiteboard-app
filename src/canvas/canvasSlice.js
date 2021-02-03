import { createSlice } from "@reduxjs/toolkit";

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
    setNotes(state, action) {
      return {
        ...state,
        notes: action.payload,
      };
    },
    addNote(state, action) {
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    },
  },
});

export const { setLines, setNotes, addNote, addLine } = canvasSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// Note: when using redux-undo, you reference state.[sliceName].present.[targetKey]
export const selectLines = (state) => state.canvas.present.lines;

export default canvasSlice.reducer;
