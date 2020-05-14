import loadable from '@/utils/loadable';

export default [
  {
    path: '/',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index')),
  },
  {
    path: '/login',
    component: loadable(() => import(/* webpackChunkName: 'login' */ '@/views/Login')),
  },
];
