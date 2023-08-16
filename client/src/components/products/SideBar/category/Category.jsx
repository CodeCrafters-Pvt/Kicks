import React, { useState } from 'react';
import Input from '../Label';
import PropTypes from 'prop-types';

const Category = ({handleChange}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={handleToggleOptions}>
        <span className="flex items-center mb-2">
          <h2 className='text-lg font-semibold mb-2'>Category</h2>
        </span>
      </div>
      {showOptions && (
        <>
          <Input name="test" value='All' label="All"  handleChange={handleChange}/>
          <Input name="test" value='Sneakers' label="Sneakers"  handleChange={handleChange} />
          <Input name="test" value='Flats' label="Flats"  handleChange={handleChange}/>
          <Input name="test" value='Sandals' label="Sandals"  handleChange={handleChange}/>
          <Input name="test" value='Heels' label="Heels"  handleChange={handleChange}/>
        </>
      )}
    </div>
  );
};

Category.propTypes = {
  handleChange: PropTypes.func, // Define PropTypes for handleChange prop
};


export default Category;
