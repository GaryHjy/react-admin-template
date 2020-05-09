import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(promise, thunk, logger));

export default store;
