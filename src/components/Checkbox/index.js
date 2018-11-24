import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ type, name, checked, onChange }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  type: 'checkbox',
  checked: false,
};

export default Checkbox;
