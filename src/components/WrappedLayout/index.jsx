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
    const { Layout, Component } = this.props;
    return (
      <Layout>
        <Component />
      </Layout>
    );
  }
}

export default WrappedLayout;
