import axios from 'axios';
import { message } from 'antd';

function axiosExtra(http) {
  for (const method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
    http[`$${method}`] = function () {
      return this[method].apply(this, arguments).then(res => res && res.data);
    };
  }
}

const instance = axios.create({
  timeout: 6000,
});

// http request 拦截器
instance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err),
);

// http response 拦截器
instance.interceptors.response.use(
  res => {
    const { data } = res;

    if (data.code >= 400) {
      message.error(data.message);
      return Promise.reject(data);
    }
    return res;
  },
  error => {
    const { status, data } = error.response;
    if (status && status === 403) {
      // Message.error({
      //   message: '当前操作无权限',
      // });
      return Promise.reject(error);
    }
    if (status === 401) {
      message.error(data.message || '登录失效，请重新登录');
      sessionStorage.removeItem('accessToken');
      // 重新载入
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return Promise.reject(error);
    }
    if (status && status >= 400) {
      message.error(data.message);
    }
    return Promise.reject(error);
  },
);

axiosExtra(instance);

export default instance;
