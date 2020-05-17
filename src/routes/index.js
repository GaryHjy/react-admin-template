import loadable from '@/utils/loadable';

export default [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index/index')),
  },
  {
    path: '/login',
    name: 'login',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: 'login' */ '@/views/Login/index')),
  },
  {
    path: '/account/center',
    name: 'account-center',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: 'account-center' */ '@/views/Account/Center')),
  },
  {
    path: '/account/setting',
    name: 'account-setting',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: 'account-setting' */ '@/views/Account/Setting')),
  },
  {
    path: '/404',
    name: '404',
    component: loadable(() => import(/* webpackChunkName: '404' */ '@/views/Others/404/index')),
  },
];
