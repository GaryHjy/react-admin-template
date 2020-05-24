import React, { Component } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { USER_LOGOUT } from '@/store/actionTypes';
import styles from './style.module.less';

class HeadDropdown extends Component {
  constructor() {
    super();
    this.state = {
      menuList: [
        {
          key: 'center',
          value: '个人中心',
          icon: <UserOutlined />,
        },
        {
          key: 'setting',
          value: '个人设置',
          icon: <SettingOutlined />,
        },
        {
          key: 'logout',
          value: '退出登录',
          icon: <LogoutOutlined />,
        },
      ],
    };
  }

  // 退出登录操作
  handleLogout = () => {
    const { dispatch } = this.props;
    sessionStorage.removeItem('accessToken');
    // 清空store中用户数据
    dispatch({
      type: USER_LOGOUT,
    });
    // 跳转登录
    dispatch(push('/login'));
  };

  // 跳转个人中心
  handleJumpCenter = () => {
    this.props.dispatch(push('/account/center'));
  };

  // 跳转个人设置
  handleJumpSetting = () => {
    this.props.dispatch(push('/account/setting'));
  };

  // 菜单点击事件
  onMenuClick = event => {
    const { key } = event;

    const methods = {
      center: this.handleJumpCenter,
      setting: this.handleJumpSetting,
      logout: this.handleLogout,
    };

    // 执行
    if (methods[key]) methods[key]();
  };

  render() {
    const { user } = this.props;
    const { menuList } = this.state;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menuList.map(menu => {
          return (
            <Menu.Item key={menu.key}>
              {menu.icon}
              {menu.value}
            </Menu.Item>
          );
        })}
      </Menu>
    );

    return (
      <Dropdown className={styles['head-dropdown']} overlay={menuHeaderDropdown}>
        <span className={styles['head-dropdown__content']}>
          <Avatar
            className={styles['head-dropdown__content--avatar']}
            size="small"
            icon={<UserOutlined />}
            alt="avatar"
          />
          <span className={styles['head-dropdown__content--name']}>{user.username}</span>
        </span>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(HeadDropdown);
