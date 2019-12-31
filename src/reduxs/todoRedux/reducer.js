import * as type from './actions'
import _ from 'lodash'

var initialState = {
  tasks: [
    {
      "id": 1,
      "task": "Mua xe",
      "date": "01/01/2020",
      "isCompleted": true
    },
    {
      "id": 2,
      "task": "Mua nhà",
      "date": "11/12/2019",
      "isCompleted": false
    },
  ],
  loading: false,
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_TASKS:
      return Object.assign({}, state, { loading: true })
    case type.FETCH_TASKS_SUCCESSED:
      return Object.assign({}, state, { loading: false, tasks: action.payload })
    case type.ADD_TASK_SUCCESSED:
      return Object.assign({}, state, { loading: false, tasks: action.payload })
    case type.UPDATE_TASK_SUCCESSED:
      return Object.assign({}, state, { tasks: action.payload })
    case type.DELETE_TASK_SUCCESSED:
      return Object.assign({}, state, { tasks: action.payload })
    default: return state;
  }
}