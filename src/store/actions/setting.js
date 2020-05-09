import * as types from '../actionTypes';

export default {
  changeMenuCollapsed(payload) {
    return {
      type: types.CHANGE_MENU_COLLAPSED,
      payload,
    };
  },
};
