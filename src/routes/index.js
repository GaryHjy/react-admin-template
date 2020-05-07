import loadable from '@/utils/loadable';

export default [
  {
    path: '/',
    exact: true,
    Component: loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index')),
  },
];
