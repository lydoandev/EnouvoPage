import { combineReducers } from 'redux'

import { todoReducer } from './todoRedux/reducer'
import authReducer from './authRedux/reducer'
export default reducers = combineReducers({
  todoReducer,
  authReducer
})