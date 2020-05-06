import React, { Component } from 'react';
import loadable from 'react-loadable';
import NProgress from 'nprogress';

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

export default (loader, loading = LoadingComponent) => loadable({ loader, loading });
