import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Input = (props) => {
  const { handleChange, label, name, type, placeholder, className, hideLabel } = props;
  return (
    <div className={cn({ 'form-group': !hideLabel })}>
      {!hideLabel && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        onChange={ev => handleChange(ev.target.value, name)}
        type={type || 'text'}
        className={`${className} form-control`}
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
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Input;
