import React, { Component } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import '@/styles/layout-styles/head-dropdown.less';

class HeadDropdown extends Component {
  onMenuClick = (event) => {
    const { key } = event;

    console.log(key);

    // if (key === 'logout') {
    //   const { dispatch } = this.props;

    //   if (dispatch) {
    //     dispatch({
    //       type: 'login/logout',
    //     });
    //   }
    // }
  };

  render() {
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
          <span className="head-dropdown__content--name">username</span>
        </span>
      </Dropdown>
    );
  }
}

export default HeadDropdown;
