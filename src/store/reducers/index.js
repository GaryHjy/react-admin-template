import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import permission from './permission';
import setting from './setting';
import history from '../history';

const reducers = {
  permission,
  setting,
  router: connectRouter(history),
};

const reducer = combineReducers(reducers);

export default reducer;
