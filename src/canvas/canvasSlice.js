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
    items: [],
  },
  reducers: {
    /**************************************************
     * Drawing lines
     */
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

    /**************************************************
     * all other items
     */
    addItem(state, action) {
      if (!action.payload.type) {
        throw new Error("item is missing a type " + JSON.stringify(action.payload));
      }

      /**
       * deselect any previous item
       */
      const deselected = state.items.map((n) => {
        n.selected = false;
        return n;
      });

      // give new item an id
      action.payload.id = uuidv1();

      // add item
      state.items = [...deselected, action.payload];
    },

    updateItem(state, action) {
      /**
       * deselect any previous item
       * replace item with matching ID with one in the payload
       */
      state.items = state.items.map((n) => {
        n.selected = false;
        if (n.id === action.payload.id) {
          return action.payload;
        }
        return n;
      });
    },

    deleteItem(state) {
      // delete the currently selected note
      state.items = state.items.filter((n) => !n.selected);
    },
  },
});

export const { setLines, addLine, addItem, updateItem, deleteItem } = canvasSlice.actions;

export const selectLines = (state) => state.canvas.present.lines;

export default canvasSlice.reducer;
