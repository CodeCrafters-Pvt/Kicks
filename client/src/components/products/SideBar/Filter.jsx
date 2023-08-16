import React from 'react';
import Category from './category/Category';
import Colors from './colors/Colors';
import Price from './price/Price';
import PropTypes from 'prop-types';
const Filter = ({handleChange}) => {
  return (
    <div className='bg-transparent'>
      <section className='mb-6 border-b border-gray-300 pb-4'>
        <Category handleChange={handleChange}/>
      </section>
      <section className='mb-6 border-b border-gray-300 pb-4'>
        <Colors handleChange={handleChange} />
      </section>
      <section className='pb-4'>
        <Price handleChange={handleChange} />
      </section>
    </div>
  );
};

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired, // Define PropTypes for handleChange prop
};


export default Filter;
