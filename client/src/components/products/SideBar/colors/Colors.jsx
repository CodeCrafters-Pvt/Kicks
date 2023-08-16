import React, { useState } from 'react';
import ColorLabel from './ColorLabel';
import PropTypes from 'prop-types';
const Colors = ({handleChange}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={handleToggleOptions}>
        <span className="flex items-center mb-2">
          <h2 className='text-lg font-semibold mb-2'>Color</h2>
        </span>
      </div>
      {showOptions && (
        <>
          <ColorLabel name="test2" value='All' color="indigo-600" label="All"  handleChange={handleChange}/>
          <ColorLabel name="test2" value='blue' color="blue-500" label="Blue"  handleChange={handleChange}/>
          <ColorLabel name="test2" value='red' color="red-500" label="Red"  handleChange={handleChange}/>
          <ColorLabel name="test2" value='green' color="green-500" label="Green"  handleChange={handleChange}/>
          <ColorLabel name="test2" value='yellow' color="yellow-500" label="Yellow"  handleChange={handleChange}/>
        </>
      )}
    </div>
  );
};

Colors.propTypes = {
  handleChange: PropTypes.func, // Define PropTypes for handleChange prop
};
export default Colors;
