import React, { Component } from 'react';

class WrappedLayout extends Component {
  constructor() {
    super();
    console.log('beforeMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    const { Layout, Component, ...props } = this.props;
    return (
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    );
  }
}

export default WrappedLayout;
