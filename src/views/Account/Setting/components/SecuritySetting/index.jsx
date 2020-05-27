import React from 'react';
import { List } from 'antd';

const SecuritySetting = () => {
  const data = [
    {
      title: '账号密码',
      description: '当前密码强度：强',
      actionsText: '修改',
    },
    {
      title: '手机号码',
      description: '已绑定手机：：138****8293',
      actionsText: '修改',
    },
    {
      title: '备用邮箱',
      description: '已绑定邮箱：：ant***sign.com',
      actionsText: '修改',
    },
  ];

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item actions={[<div key={1}>{item.actionsText}</div>]}>
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );
};

export default SecuritySetting;
