import React from 'react';
import PropTypes from 'prop-types';
const ColorLabel = ({ name, color,value, label , handleChange}) => {
  return (
    <label className="flex items-center mb-2">
      <input type="radio" name={name} className="hidden" value={value}  onChange={handleChange} color={color}/>
      <span
        className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer hover:opacity-75"
        style={{ backgroundColor: 'transparent' }}
      >
        <span className={`w-4 h-4 rounded-full bg-${color}`}></span>
      </span>
      <span className="ml-2">{label}</span>
    </label>
  );
};
ColorLabel.propTypes = {
  name: PropTypes.string, // Define PropTypes for name prop (string type and required)
  color: PropTypes.string, // Define PropTypes for color prop (string type and required)
  value: PropTypes.string, // Define PropTypes for value prop (string type)
  label: PropTypes.string, 
  handleChange: PropTypes.func, // Define PropTypes for handleChange prop
};
export default ColorLabel;
