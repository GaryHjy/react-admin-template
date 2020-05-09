import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
import reducers from './reducers';
import history from './history';

const store = createStore(reducers, applyMiddleware(routerMiddleware(history), promise, thunk, logger));

export default store;
