import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import './Select.scss';

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const { children } = props;
  const { onChange } = props.onChange ? props.onChange : field;
  const { onBlur, name, value } = field;

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select
        onChange={onChange}
        onBlur={onBlur}
        id={props.id}
        name={name}
        required={props.required}
        value={value}
      >
        {children}
      </select>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Select.defaultProps = {
  onChange: undefined,
  required: false,
};

export default Select;
