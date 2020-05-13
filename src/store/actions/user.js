import { loginByUserName } from '@/services/api/user';
import { UPDATE_USER_INFO } from '../actionTypes';

export default {
  /**
   * @description 登录
   * @param {*} values 登录表单
   */
  loginByUserName(values) {
    return {
      type: UPDATE_USER_INFO,
      payload: loginByUserName(values),
    };
  },
};
