import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfoByToken } from '../../services/api/user';
import { UPDATE_USER_INFO } from '../../store/actionTypes';

class WrappedLayout extends Component {
  constructor() {
    super();
    console.log('beforeMount');
  }

  componentDidMount() {
    const { location, history, store } = this.props;
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken && location.pathname !== '/login') {
      history.push('/login');
    }
    // 更新user数据
    if (accessToken && !store.user.accessToken) {
      getUserInfoByToken(accessToken).then(({ data }) => {
        this.props.dispatch({
          type: UPDATE_USER_INFO,
          payload: data,
        });
      });
    }
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
