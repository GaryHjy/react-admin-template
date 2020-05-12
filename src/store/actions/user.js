import { loginByUserName } from '@/services/api/user';
import { push } from 'connected-react-router';

export default {
  /**
   * @description 登录
   * @param {*} values 登录表单
   */
  loginByUserName(values) {
    return async dispatch => {
      try {
        const { data } = await loginByUserName(values);
        console.log(data);
        dispatch(push('/'));
      } catch (error) {
        console.log(error);
      }
    };
  },
};
