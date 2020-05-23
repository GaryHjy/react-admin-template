import React, { Component } from 'react';
import { Menu } from 'antd';
import styles from './style.module.less';

class AccountSetting extends Component {
  state = {
    active: 'basic',
    menuList: [
      {
        key: 'basic',
        value: '基本信息',
      },
      {
        key: 'security',
        value: '安全设置',
      },
    ],
  };

  handleChange = ({ key }) => {
    this.setState({
      active: key,
    });
  };

  render() {
    const { menuList, active } = this.state;
    return (
      <div className={styles.setting}>
        <div className={styles.setting__menu}>
          <Menu mode="inline" defaultSelectedKeys={active} onSelect={this.handleChange}>
            {menuList.map(menu => (
              <Menu.Item key={menu.key}>{menu.value}</Menu.Item>
            ))}
          </Menu>
        </div>
        <div className={styles.setting__body}>{active}</div>
      </div>
    );
  }
}

export default AccountSetting;
