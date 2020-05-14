import React, { Component } from 'react';
import loadable from 'react-loadable';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // 进度条css
import BasicLayout from '@/layouts/BasicLayout/index';

class LoadingComponent extends Component {
  constructor(props) {
    super(props);
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    return <div />;
  }
}

export default (loader, loading = LoadingComponent) =>
  loadable({
    loader,
    loading,
    // eslint-disable-next-line react/no-multi-comp
    render(loaded, props) {
      console.log(loaded, props);
      const Component = loaded.default;
      const Layout = Component.Layout || BasicLayout;
      return (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      );
    },
  });
