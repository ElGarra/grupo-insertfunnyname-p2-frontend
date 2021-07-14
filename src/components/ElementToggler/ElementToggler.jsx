import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './ElementToggler.scss';

import BaseButton from '../BaseButton/BaseButton';

const ElementToggler = (props) => {
  const [showContents, setShowContents] = useState(false);
  const { prompt, children } = props;

  return (
    <div className="ElementToggler">
      {showContents ? (
        <div>{children}</div>
      ) : (
        <BaseButton onClick={() => setShowContents(true)}>{prompt}</BaseButton>
      )}
    </div>
  );
};

ElementToggler.propTypes = {
  prompt: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ElementToggler.defaultProps = {
  children: null,
};

export default ElementToggler;
