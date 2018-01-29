import PropTypes from 'prop-types';
import React from 'react';

const Input = (props) => {
  const { onChange, label, name, type, placeholder, className, hideLabel } = props;
  return (
    <div className="form-group">
      {!hideLabel && <label htmlFor="exampleInputEmail1">{label}</label>}
      <input
        name={name}
        onChange={ev => onChange(ev.target.value, name)}
        type={type || 'text'}
        className={`${className} form-control c-input`}
        placeholder={placeholder}
      />
    </div>
  );
};

Input.defaultProps = {
  className: null,
  hideLabel: false,
  label: undefined,
  type: null,
};

Input.propTypes = {
  className: PropTypes.string,
  hideLabel: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Input;
