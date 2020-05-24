import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import LayoutHead from '../components/LayoutHead';
import styles from './style.module.less';

const { Content, Footer, Sider } = Layout;

class DefaultLayout extends Component {
  render() {
    const { children, setting } = this.props;
    const { collapsed } = setting;
    return (
      <>
        <Layout className={styles['basic-layout']}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                nav 1
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                nav 2
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
                nav 4
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <LayoutHead />
            <Content className={styles['basic-layout__content']}>
              <div className={styles['basic-layout__content--children']}>{children}</div>
              <Footer className={styles['basic-layout__footer']}>Ant Design ©2018 Created by Ant UED</Footer>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(DefaultLayout);
