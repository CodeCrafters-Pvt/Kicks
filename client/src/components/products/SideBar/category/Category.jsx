import React from 'react';

const Category = () => {
  return (
    <div>
      <label className="flex items-center mb-2">
        <input type="radio" name="test" className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
        <span className="ml-2">All</span>
      </label>
      <label className="flex items-center mb-2">
        <input type="radio" name="test" className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
        <span className="ml-2">Sneakers</span>
      </label>
      <label className="flex items-center mb-2">
        <input type="radio" name="test" className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
        <span className="ml-2">Flats</span>
      </label>
      <label className="flex items-center mb-2">
        <input type="radio" name="test" className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
        <span className="ml-2">Sandals</span>
      </label>
      <label className="flex items-center mb-2">
        <input type="radio" name="test" className="form-radio h-4 w-4 text-indigo-600 transition duration-150  ease-in-out" />
        <span className="ml-2">Heels</span>
      </label>
    </div>
  );
};

export default Category;
