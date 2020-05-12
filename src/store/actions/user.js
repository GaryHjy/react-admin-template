import { loginByUserName } from '@/services/api/user';
import * as TYPES from '../actionTypes';

export default {
  /**
   * @description 登录
   * @param {*} values 登录表单
   */
  loginByUserName(values) {
    return {
      type: TYPES.UPDATE_USER_INFO,
      payload: loginByUserName(values),
    };
  },
};
