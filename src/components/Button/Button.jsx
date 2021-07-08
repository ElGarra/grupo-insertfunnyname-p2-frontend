import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = (props) => {
  const { children } = props;

  return (
    <button className="Button" type="button">
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Button;
