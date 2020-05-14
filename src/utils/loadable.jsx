import React from 'react';
import loadable from 'react-loadable';
import LoadingComponent from '@/components/LoadingComponent';
import WrappedLayout from '@/components/WrappedLayout/index';
import BasicLayout from '@/layouts/BasicLayout/index';

export default (loader, loading = LoadingComponent) =>
  loadable({
    loader,
    loading,
    // 手动渲染
    render(loaded, props) {
      // 获取组件
      const Component = loaded.default;
      // 获取layout
      const Layout = Component.Layout || BasicLayout;
      return <WrappedLayout Layout={Layout} Component={Component} {...props} />;
    },
  });
