import callMockAPI from '../../utils/callMockAPI'
import { put, takeLatest, call } from 'redux-saga/effects'

// import {
//   FETCH_TASKS,
//   FETCH_TASKS_SUCCESSED,
//   ADD_NEW,
//   ADD_NEW_SUCCESSED,
//   UPDATE_TASK,
//   UPDATE_TASK_SUCCESSED,
//   DELETE_TASK,
//   DELETE_TASK_SUCCESSED,
//   ADD_TASK
// } from './actions';

import * as types from './actions'

export function* fetchTasks() {
  console.log("Fetch r nè")
  try {
    var data = yield call(() => callMockAPI('tasks'));
    yield put({ type: types.FETCH_TASKS_SUCCESSED, payload: data.data })
  } catch (error) {
    console.log("Error: ", error);
  }
}

export function* addTask(action) {
  try {
    var result = yield call(() => callMockAPI('tasks', 'POST', action.payload));
    var data = yield call(() => callMockAPI('tasks'));
    console.log("Data fetch", data)
    yield put({ type: types.ADD_TASK_SUCCESSED, payload: data.data })
  } catch (error) {
    console.log("Error: ", error);
  }
}

export function* deleteTask(action) {
  try {
    var result = yield call(() => callMockAPI('tasks/' + action.payload, 'DELETE'));
    var data = yield call(() => callMockAPI('tasks'));
    console.log("Data fetch", data)
    yield put({ type: types.DELETE_TASK_SUCCESSED, payload: data.data })
  } catch (error) {
    console.log("Error: ", error);
  }
}

export function* updateTask(action) {
  // var { id, isCompleted } = action.payload;
  console.log("Payload: ", action.payload);

  try {
    var result = yield call(() => callMockAPI("tasks/" + action.payload.id, "PUT", action.payload))
    var data = yield call(() => callMockAPI('tasks'));
    yield put({ type: types.UPDATE_TASK_SUCCESSED, payload: data.data })
  } catch (error) {
    console.log("Payload: ", action.payload);

    console.log("Error: ", error.response.data.message);
  }
}

export const watchToDoSaga = [
  takeLatest('FETCH_TASKS', fetchTasks),
  takeLatest('ADD_TASK', addTask),
  takeLatest('DELETE_TASK', deleteTask),
  takeLatest('UPDATE_TASK', updateTask),
]