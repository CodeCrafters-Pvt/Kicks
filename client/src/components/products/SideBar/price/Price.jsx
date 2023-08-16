import React, { useState } from 'react';
import Input from '../Label';
import PropTypes from 'prop-types';
const Price = ( {handleChange}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={handleToggleOptions}>
        <span className="flex items-center mb-2">
          <h2 className='text-lg font-semibold mb-2'>Price</h2>
        </span>
      </div>
      {showOptions && (
        <>
          <Input name="test1" value="all" label="All"  handleChange={handleChange}/>
          <Input name="test1" value="0-50" label="$0 - $50"  handleChange={handleChange}/>
          <Input name="test1" value="50-100" label="$50 - $100"  handleChange={handleChange}/>
          <Input name="test1" value="100-150" label="$100 - $150"  handleChange={handleChange}/>
          <Input name="test1" value="over-150" label="Over $150"  handleChange={handleChange}/>
        </>
      )}
    </div>
  );
};

Price.propTypes = {
  handleChange: PropTypes.func, // Define PropTypes for handleChange prop
};

export default Price;
