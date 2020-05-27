import React, { Component } from 'react';
import { Menu } from 'antd';
import styles from './style.module.less';
import BasicForm from './components/BasicForm';
import SecuritySetting from './components/SecuritySetting';

class AccountSetting extends Component {
  state = {
    active: 'basic',
    menuList: [
      {
        key: 'basic',
        value: '基本信息',
        component: BasicForm,
      },
      {
        key: 'security',
        value: '安全设置',
        component: SecuritySetting,
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
    const config = menuList.find(menu => menu.key === active);
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
          <h2 className={styles['setting__body--title']}>{config.value}</h2>
          <div className={styles['setting__body--children']}>
            <config.component />
          </div>
        </div>
      </div>
    );
  }
}

export default AccountSetting;
