import React from 'react';
import PropTypes from 'prop-types';

import './BaseForm.scss';

const BaseForm = ({ title, children }) => (
  <div className="BaseForm">
    {title ? <h3 className="formTitle">{title}</h3> : null}
    {children}
  </div>
);

BaseForm.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
};

BaseForm.defaultProps = {
  title: null,
};

export default BaseForm;
