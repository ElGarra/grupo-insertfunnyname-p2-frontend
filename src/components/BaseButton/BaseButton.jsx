import React from 'react';
import PropTypes from 'prop-types';

import './BaseButton.scss';

const BaseButton = (props) => {
  const { children } = props;

  return (
    <button className="BaseButton" type="button">
      {children}
    </button>
  );
};

BaseButton.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BaseButton;
