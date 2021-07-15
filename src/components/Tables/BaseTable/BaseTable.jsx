import React from 'react';
import PropTypes from 'prop-types';

import './BaseTable.scss';

const BaseTable = (props) => {
  const {
    children, //
    padding,
    headers,
    title,
  } = props;

  return (
    <div className="wrapper">
      <h4 className="view-title">{title}</h4>
      <div className={`BaseTable ${padding ? 'table-padding' : ''}`}>
        <div className="row header">
          {headers.map((header) => (
            <div key={header} className="cell">
              {header}
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

BaseTable.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.bool,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
};

BaseTable.defaultProps = {
  children: null,
  padding: false,
  title: '',
};

export default BaseTable;
