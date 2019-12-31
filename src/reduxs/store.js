// import { createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'redux-saga';

// import rootSaga from './sagas'
// import reducers from './reducers'
// import { createLogger } from 'redux-logger'

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(
//   reducers,
//   applyMiddleware(
//     sagaMiddleware,
//     createLogger()
//   ),
// );
// sagaMiddleware.run(rootSaga);
// export {
//   store,
// }

import { createStore, applyMiddleware, compose } from "redux"
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from "redux-saga"
import rootSaga from './sagas'
import reducers from './reducers'
import { AsyncStorage } from "react-native"

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer', 'todoReducer']
}

const middleware = []
const enhancers = []

/* ------------- Saga Middleware ------------- */
const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)

/* ------------- Redux Logger ------------- */
const logger = createLogger()
middleware.push(logger)

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middleware))

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, compose(...enhancers))
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)