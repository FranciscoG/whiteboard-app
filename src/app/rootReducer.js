import { combineReducers } from 'redux'
import toolReducer from 'features/tools/toolSlice'

export default combineReducers({
  tool: toolReducer,
})