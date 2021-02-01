import { combineReducers } from "redux";
import undoable from 'redux-undo';
import canvasReducer from 'canvas/canvasSlice';
import toolReducer from "features/tools/toolSlice";

export default combineReducers({
  tool: toolReducer,
  canvas: undoable(canvasReducer)
});
