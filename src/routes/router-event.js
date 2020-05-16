import Event from '@/utils/event';
import { getUserInfoByToken } from '@/services/api/user';
import { UPDATE_USER_INFO } from '@/store/actionTypes';

const routerEvent = new Event();

// 路由跳转
routerEvent.on('afterRouter', function ({ location, history, store, dispatch }) {
  const accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken && location.pathname !== '/login') {
    history.push('/login');
  }
  // 更新user数据
  if (accessToken && !store.user.accessToken) {
    getUserInfoByToken(accessToken)
      .then(({ data }) => {
        dispatch({
          type: UPDATE_USER_INFO,
          payload: data,
        });
      })
      .catch(e => console.log(e));
  }
});

export default routerEvent;
