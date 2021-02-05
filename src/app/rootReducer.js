import { combineReducers } from "redux";
import undoable from "redux-undo";
import canvasReducer from "canvas/canvasSlice";
import toolReducer from "features/tools/toolSlice";
import noteReducer from "features/note/noteSlice";

export default combineReducers({
  tool: toolReducer,
  canvas: undoable(canvasReducer),
  note: noteReducer
});
