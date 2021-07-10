import React from 'react';
import PropTypes from 'prop-types';

import './BaseCard.scss';

const BaseCard = (props) => {
  const { children } = props;

  return <div className="BaseCard">{children}</div>;
};

BaseCard.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BaseCard;
