import * as types from '../actionTypes';

const initialState = {
  collapsed: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_MENU_COLLAPSED:
      return { ...state, collapsed: action.payload };
    default:
      return state;
  }
}
