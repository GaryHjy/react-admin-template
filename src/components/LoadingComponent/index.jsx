import React, { Component } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // 进度条css

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

export default LoadingComponent;
