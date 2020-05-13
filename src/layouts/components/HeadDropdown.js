import React, { Component } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import '@/styles/layout-styles/head-dropdown.less';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { USER_LOGOUT } from '../../store/actionTypes';

class HeadDropdown extends Component {
  onMenuClick = event => {
    const { key } = event;
    const { dispatch } = this.props;

    console.log(key);

    if (key === 'logout') {
      sessionStorage.removeItem('accessToken');
      // 清空store中用户数据
      dispatch({
        type: USER_LOGOUT,
      });
      // 跳转登录
      dispatch(push('/login'));
    }
  };

  render() {
    const { user } = this.props;
    const menuHeaderDropdown = (
      <Menu className="menu" selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown className="head-dropdown" overlay={menuHeaderDropdown}>
        <span className="head-dropdown__content">
          <Avatar className="head-dropdown__content--avatar" size="small" icon={<UserOutlined />} alt="avatar" />
          <span className="head-dropdown__content--name">{user.username}</span>
        </span>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(HeadDropdown);
