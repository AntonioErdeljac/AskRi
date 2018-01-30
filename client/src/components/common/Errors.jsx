import PropTypes from 'prop-types';
import React from 'react';

const Errors = (props) => {
  const { errors } = props;
  return (
    <ul className="list-group my-3">
      {
        Object.keys(errors).map(key => (
          <li className="list-group-item list-group-item-danger">{key[0].toUpperCase()}{key.slice(1)} {errors[key]}</li>
        ))
      }
    </ul>
  );
};

Errors.propTypes = {
  errors: PropTypes.shape({}).isRequired,
};

export default Errors;
