import React from 'react';
import loadable from 'react-loadable';
import LoadingComponent from '@/components/LoadingComponent';
import WrappedLayout from '@/components/WrappedLayout/index';
import BasicLayout from '@/layouts/BasicLayout/index';

export default (loader, loading = LoadingComponent) =>
  loadable({
    loader,
    loading,
    render(loaded, props) {
      const Component = loaded.default;
      const Layout = Component.Layout || BasicLayout;
      return <WrappedLayout Layout={Layout} Component={Component} {...props} />;
    },
  });
