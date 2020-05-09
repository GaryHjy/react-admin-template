import { combineReducers } from 'redux';
import permission from './permission';
import setting from './setting';

const reducers = {
  permission,
  setting,
};

const reducer = combineReducers(reducers);

export default reducer;
