import React, { Component } from 'react';
import { Layout } from 'antd';
import '@/styles/layout-styles/basic-layout.less';

const { Header, Footer, Sider, Content } = Layout;

class DefaultLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="basic-layout">
        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Header>Header</Header>
            <Content>{children}</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default DefaultLayout;
