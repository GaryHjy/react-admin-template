import React, { Component } from 'react';
import { Menu } from 'antd';
import styles from './style.module.less';
import BasicForm from './components/basicForm';

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
    const curTitle = menuList.find(menu => menu.key === active);
    return (
      <div className={styles.setting}>
        <div className={styles.setting__menu}>
          <Menu mode="inline" defaultSelectedKeys={active} onSelect={this.handleChange}>
            {menuList.map(menu => (
              <Menu.Item key={menu.key}>{menu.value}</Menu.Item>
            ))}
          </Menu>
        </div>
        <div className={styles.setting__body}>
          <h2 className={styles['setting__body--title']}>{curTitle.value}</h2>
          <BasicForm />
        </div>
      </div>
    );
  }
}

export default AccountSetting;
