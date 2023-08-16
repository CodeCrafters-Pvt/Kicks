import React from 'react';
import PropTypes from 'prop-types';
const Label = ({ name, value, label , handleChange}) => {
  return (
    <label className="flex items-center mb-2">
      <input
        type="radio"
        name={name}
        onChange={handleChange}
        value={value}
        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};

Label.propTypes = {
  name: PropTypes.string, // Define PropTypes for name prop (string type and required)
  value: PropTypes.string, // Define PropTypes for value prop (string type and required)
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func, // Define PropTypes for handleChange prop
};

export default Label;
