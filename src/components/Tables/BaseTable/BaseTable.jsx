import React from 'react';
import PropTypes from 'prop-types';

import './BaseTable.scss';

const BaseTable = (props) => {
  const { children, padding } = props;

  return (
    <div className="wrapper">
      <div className="BaseTable">
        {padding ? <div className="table-padding">{children}</div> : children}
      </div>
    </div>
  );
};

BaseTable.propTypes = {
  children: PropTypes.element.isRequired,
  padding: PropTypes.bool,
};

BaseTable.defaultProps = {
  padding: false,
};

export default BaseTable;
