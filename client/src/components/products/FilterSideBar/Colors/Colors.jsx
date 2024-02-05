import React from 'react'
import PropTypes from 'prop-types';
import Input from '../Input';
import { useState } from 'react';

const Colors = ({ handleChange }) => {

  return (
    <>
      <h2 className='text-xl font-normal mb-[20px]'>Category</h2>


      <label className=' block relative pl-[20px] mb-[12px]'>
        <input type="radio" name="test1" />
        <span></span> All
      </label>


      <Input
        handleChange={handleChange}
        value="Black"
        title="Black"
        name="test1"
        color="black"
      />

      <Input
        handleChange={handleChange}
        value="Red"
        title="Red"
        name="test1"
        color="red"
      />

      <Input
        handleChange={handleChange}
        value="Green"
        title="Green"
        name="test1"
        color="green"
      />

      <Input
        handleChange={handleChange}
        value="Purple"
        title="Purple"
        name="test1"
        color="purple"
      />

      <label className=' block relative pl-[20px] mb-[12px]'>
        <input
          type="radio"
          onChange={handleChange}
          value="white" name="test1" />
        <span style={{
          background: "white",
          border: "2px solid black"
        }}></span>
      </label>

   
    </>
  )
}

Colors.propTypes = {
  handleChange: PropTypes.func,
}


export default Colors
