import loadable from '@/utils/loadable';

export default [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index')),
  },
  {
    path: '/login',
    name: 'login',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: 'login' */ '@/views/Login')),
  },
  {
    path: '/404',
    name: '404',
    component: loadable(() => import(/* webpackChunkName: '404' */ '@/views/Others/404/index.jsx')),
  },
];
