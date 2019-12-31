import { all } from 'redux-saga/effects';
import { watchUserSaga } from './authRedux/sagas'
import { watchToDoSaga } from './todoRedux/sagas'

export default function* rootSaga() {
  // yield all([
  //   watchUserSaga(),
  //   // watchToDoSaga()
  // ])
  yield all([
    ...watchToDoSaga,
    ...watchUserSaga,
  ])
}