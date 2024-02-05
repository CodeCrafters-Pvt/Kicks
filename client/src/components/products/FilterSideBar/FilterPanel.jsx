import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Category from './Category/Category';
import Price from './Price/Price';
import Colors from './Colors/Colors';

const FilterPanel = ({handleChange}) => {

  return (
    <>

      <section className=" p-4  border-gray-300  border-r-2 h-auto flex-col ">
        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
        <Colors handleChange={handleChange} />
      </section>

    </>
  );
};

FilterPanel.propTypes = {
  handleChange: PropTypes.func,
}

export default FilterPanel;
