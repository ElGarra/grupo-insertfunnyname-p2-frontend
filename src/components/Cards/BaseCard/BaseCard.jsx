import React from 'react';
import PropTypes from 'prop-types';

import './BaseCard.scss';

const BaseCard = (props) => {
  const { children, padding } = props;

  return (
    <div className="BaseCard">
      {padding ? <div className="card-padding">{children}</div> : children}
    </div>
  );
};

BaseCard.propTypes = {
  children: PropTypes.element.isRequired,
  padding: PropTypes.bool,
};

BaseCard.defaultProps = {
  padding: false,
};

export default BaseCard;
