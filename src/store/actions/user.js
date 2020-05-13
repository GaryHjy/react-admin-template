import { loginByUserName } from '@/services/api/user';
import { UPDATE_USER_INFO } from '../actionTypes';

/**
 * @description 更新用户信息
 * @param {*} payload 用户信息
 */
function updateUserInfo(payload) {
  return {
    type: UPDATE_USER_INFO,
    payload,
  };
}

export default {
  updateUserInfo,

  /**
   * @description 登录
   * @param {*} values 登录表单
   */
  loginByUserName(values) {
    return dispatch => {
      return loginByUserName(values).then(({ data }) => {
        dispatch(updateUserInfo(data));
        return data;
      });
    };
  },
};
