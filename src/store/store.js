import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers'
import logger from 'redux-logger'
import sagas from 'redux-saga'
import mysaga from './sagas.js'
let applysagas = sagas()
let store = createStore(reducers, applyMiddleware(logger), applyMiddleware(applysagas))
applysagas.run(mysaga)
export default store