import React, { Component } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import settingActions from '@/store/actions/setting';
import HeadDropdown from './HeadDropdown';
import '@/styles/layout-styles/layout-head.less';

const { Header } = Layout;

class LayoutHead extends Component {
  handleToggle = () => {
    const { collapsed } = this.props;
    this.props.changeMenuCollapsed(!collapsed);
  };

  SwitchButton = () => {
    const { collapsed } = this.props;
    const Comp = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
    return <Comp onClick={this.handleToggle} />;
  };

  render() {
    return (
      <Header className="layout-head">
        {this.SwitchButton()}
        <HeadDropdown />
      </Header>
    );
  }
}

const mapStateToProps = state => state.setting;

export default connect(mapStateToProps, settingActions)(LayoutHead);
