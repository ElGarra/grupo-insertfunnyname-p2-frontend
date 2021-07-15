import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import './TextArea.scss';

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const { onChange } = props.onChange ? props : field;
  const { onBlur, name, value } = field;

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        className="text-area"
        onChange={onChange}
        onBlur={onBlur}
        id={props.id}
        name={name}
        value={value}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        required={props.required}
      />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.node.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  rows: PropTypes.number,
};

TextArea.defaultProps = {
  placeholder: '',
  onChange: undefined,
  required: false,
  minLength: undefined,
  maxLength: undefined,
  rows: 1,
};

export default TextArea;
