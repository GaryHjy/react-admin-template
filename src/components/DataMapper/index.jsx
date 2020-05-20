import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';

const DescriptionItem = Descriptions.item;

class DataMapper extends Component {
  render() {
    const { title, data, columns } = this.props;
    return (
      <Descriptions title={title}>
        {columns.map((column, index) => {
          return (
            <DescriptionItem key={index} label={column.label}>
              {column.render ? column.render(data) : data[column.key] || '-'}
            </DescriptionItem>
          );
        })}
      </Descriptions>
    );
  }
}

DataMapper.defaultProps = {
  title: '',
  data: {},
  columns: [],
};

DataMapper.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  columns: PropTypes.array,
};

export default DataMapper;
