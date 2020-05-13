import { CHANGE_MENU_COLLAPSED } from '../actionTypes';

export default {
  changeMenuCollapsed(payload) {
    return {
      type: CHANGE_MENU_COLLAPSED,
      payload,
    };
  },
};
