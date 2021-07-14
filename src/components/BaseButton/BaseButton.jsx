import React from 'react';
import PropTypes from 'prop-types';

import './BaseButton.scss';

const BaseButton = (props) => {
  const {
    children, //
    type,
    onClick,
    styleType,
  } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`BaseButton ${styleType}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

BaseButton.propTypes = {
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  styleType: PropTypes.oneOf(['', 'error', 'warning', 'info', 'success']),
  children: PropTypes.node,
  onClick: PropTypes.func,
};

BaseButton.defaultProps = {
  type: 'button',
  styleType: '',
  children: 'Submit',
  onClick: undefined,
};

export default BaseButton;
