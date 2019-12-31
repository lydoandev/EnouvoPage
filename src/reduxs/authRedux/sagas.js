import callAPI from '../../utils/callAPI'
import callMockAPI from '../../utils/callMockAPI'
import { Navigation } from 'react-native-navigation'

import {
  REGISTER,
  LOGIN,
  LOGOUT,
  LOGIN_SUCCESSED,
  REGISTER_FAILED,
  REGISTER_SUCCESSED,
  LOGIN_FAILED,
  LOGOUT_SUCCESSED,
} from './actions';
import { put, takeLatest, call } from 'redux-saga/effects'

export function* Register(action) {
  try {
    const data = yield call(() => callAPI(`auth/register`, 'POST', action.payload))

    const user = yield call(() => callAPI(`users/me`, 'GET', "", data.data.token))
    yield put({ type: REGISTER_SUCCESSED, payload: user });
  } catch (error) {
    yield put({ type: REGISTER_FAILED, payload: error?.response?.data?.message || "Something went wrong!" });
  }
}
export function* Login(action) {
  try {
    const data = yield call(() => callAPI(`auth/login`, 'POST', action.payload))
    const user = yield call(() => callAPI(`users/me`, 'GET', "", data.data.token))
    yield put({ type: LOGIN_SUCCESSED, payload: user });
  } catch (error) {
    yield put({ type: LOGIN_FAILED, payload: error?.response?.data?.message || "Something went wrong!" });
  }
}

export function* Logout() {
  yield put({ type: LOGOUT_SUCCESSED });
  Navigation.setRoot({
    root: {
      component: {
        name: 'LogIn',
      }
    }
  });
}

export function* fetchTasks() {
  try {
    var data = yield call(() => callMockAPI('tasks'));
    yield put({ type: "FETCH_TASKS_SUCCESSED", payload: data.data })
  } catch (error) {
    console.log("Error: ", error);
  }
}
export const watchUserSaga = [
  takeLatest(REGISTER, Register),
  takeLatest(LOGIN, Login),
  takeLatest(LOGOUT, Logout)
]