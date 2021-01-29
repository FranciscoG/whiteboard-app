import { combineReducers } from 'redux'
import controlReducer from 'features/controls/controlSlice'

export default combineReducers({
  control: controlReducer,
})