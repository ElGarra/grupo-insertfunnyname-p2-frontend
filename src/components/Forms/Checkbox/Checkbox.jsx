import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import './Checkbox.scss';

const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  const {
    onChange, //
    onBlur,
    name,
    value,
  } = field;

  return (
    <div>
      <label className="checkbox-input" htmlFor={props.id}>
        <input
          type="checkbox"
          id={props.id}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
        />
        {children}
      </label>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Checkbox.defaultProps = {
  children: null,
};

export default Checkbox;
