import React, { Component } from 'react';
import { Descriptions } from 'antd';

const { item } = Descriptions;

class DataMapper extends Component {
  render() {
    const { title, data, columns } = this.props;
    return (
      <Descriptions title={title}>
        {columns.map((column, index) => {
          return (
            <item key={index} label={column.label}>
              {data[column.key] || '-'}
            </item>
          );
        })}
      </Descriptions>
    );
  }
}

export default DataMapper;
