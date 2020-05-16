import React, { Component } from 'react';
import { connect } from 'react-redux';
import routerEvent from '@/routes/router-event';

class WrappedLayout extends Component {
  componentDidMount() {
    const { location, history, store, dispatch, match } = this.props;
    const context = {
      location,
      history,
      match,
      store,
      dispatch,
    };
    routerEvent.emit('afterRouter', context);
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

const mapStateToProps = state => {
  return {
    store: state,
  };
};

export default connect(mapStateToProps)(WrappedLayout);
