import React from 'react';
import PropTypes from 'prop-types';

import './BaseCard.scss';

const BaseButton = (props) => {
  const { children } = props;

  return <div className="BaseCard">{children}</div>;
};

BaseButton.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BaseButton;
