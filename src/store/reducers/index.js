import { combineReducers } from 'redux';
import permission from './permission';

const reducers = {
  permission,
};

const reducer = combineReducers(reducers);

export default reducer;
