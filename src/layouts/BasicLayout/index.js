import React, { Component } from 'react';
import { connect } from 'react-redux';
import '@/styles/layout-styles/basic-layout.less';
import { Layout, Menu } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import settingActions from '@/store/actions/setting';

const { Header, Content, Footer, Sider } = Layout;

class DefaultLayout extends Component {
  toggle = () => {
    const { collapsed } = this.props.setting;
    this.props.changeMenuCollapsed(!collapsed);
  };

  triggerIcon = () => {
    const { collapsed } = this.props.setting;
    const Comp = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
    return <Comp onClick={this.toggle} />;
  };

  render() {
    const { children, setting } = this.props;
    const { collapsed } = setting;
    return (
      <>
        <Layout className="basic-layout">
          <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu mode="inline" defaultSelectedKeys={['1']}>
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
            <Header className="basic-layout__header">{this.triggerIcon()}</Header>
            <Content className="basic-layout__content">
              <div className="basic-layout__content--children">{children}</div>
              <Footer className="basic-layout__footer">Ant Design ©2018 Created by Ant UED</Footer>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, settingActions)(DefaultLayout);
