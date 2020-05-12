import * as TYPES from '../actionTypes';

export default {
  changeMenuCollapsed(payload) {
    return {
      type: TYPES.CHANGE_MENU_COLLAPSED,
      payload,
    };
  },
};
