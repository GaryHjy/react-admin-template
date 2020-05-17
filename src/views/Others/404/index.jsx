import React from 'react';
import { Result, Button } from 'antd';
import OtherLayout from '@/layouts/OtherLayout';

function NoFind(props) {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在。"
      extra={
        <Button type="primary" onClick={() => props.history.push('/')}>
          返回首页
        </Button>
      }
    />
  );
}

NoFind.Layout = OtherLayout;

export default NoFind;
