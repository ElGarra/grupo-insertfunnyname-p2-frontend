import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import './TextInput.scss';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const { onBlur, name, value } = field;

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className="text-input"
        onChange={props.onChange}
        onBlur={onBlur}
        id={props.id}
        name={name}
        value={value}
        type={props.type}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.node.isRequired,
  onChange: PropTypes.func,
};

TextInput.defaultProps = {
  placeholder: '',
  onChange: () => {},
};

export default TextInput;
