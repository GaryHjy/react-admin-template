import loadable from '@/utils/loadable';
// import DefaultLayout from '@/layouts/Default/index';
import LoginLayout from '@/layouts/Login/index';

export default [
  {
    path: '/',
    exact: true,
    Component: loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index')),
    layout: LoginLayout,
  },
];
