import axios from 'axios';

function axiosExtra(http) {
  const newMethods = {};
  ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch'].forEach(method => {
    newMethods[`$${method}`] = function (...args) {
      const context = this;
      return context[method].apply(this, args).then(res => res && res.data);
    };
  });
  Object.assign(http, newMethods);
}

const instance = axios.create({
  timeout: 6000,
});

// http request 拦截器
instance.interceptors.request.use(
  config => {
    // if (store.state.token) {
    //   config.headers.Authorization = `Bearer ${store.state.token}`;
    // }
    return config;
  },
  err => Promise.reject(err),
);

// http response 拦截器
instance.interceptors.response.use(
  res => {
    const { data } = res;

    if (data.code === '207') {
      // Message.error({
      //   message: data.msg || '登录失效，请重新登录',
      // });
      // router.push('/login');
      sessionStorage.removeItem('token');
      return Promise.reject(data);
    }

    if (data.code >= 500) {
      // Message.error({
      //   message: data.msg || '系统错误，请稍后再试...',
      // });
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
    if (status && status >= 400) {
      // Message.error({
      //   message: data.msg || '系统错误，请稍后再试...',
      // });
    }
    console.log(data);
    return Promise.reject(error);
  },
);

axiosExtra(instance);

export default instance;
