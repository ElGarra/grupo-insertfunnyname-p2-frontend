import React from 'react';
import PropTypes from 'prop-types';

import './BaseButton.scss';

const BaseButton = (props) => {
  const { children, type } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button className="BaseButton" type={type}>
      {children}
    </button>
  );
};

BaseButton.propTypes = {
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  children: PropTypes.node,
};

BaseButton.defaultProps = {
  type: 'button',
  children: 'Submit',
};

export default BaseButton;
