import React from 'react'
import Input from '../Input'

import PropTypes from 'prop-types';

const Category = ({handleChange}) => {
  return (
    <>
   <h2 className='text-xl font-normal mb-[20px]'>Category</h2>   
  
   <label className=' block relative pl-[20px] mb-[12px]'>
    <input onChange={handleChange} type="radio" name="test"/>
    <span></span> All
   </label>
   <Input 
   handleChange={handleChange}
   value="Sneaker"
   title = "Sneaker"
   name="test"
    />
    <Input 
   handleChange={handleChange}
   value="Heels"
   title = "Heels"
   name="test"
    />
      <Input 
   handleChange={handleChange}
   value="Shoes"
   title = "Shoes"
   name="test"
    />
      <Input 
   handleChange={handleChange}
   value="Flip flops"
   title = "Flip Flops"
   name="test"
    />
      <Input 
   handleChange={handleChange}
   value="Flats"
   title = "Flats"
   name="test"
    />
    </>
  )
}

Category.propTypes = {
  handleChange: PropTypes.func,
}

export default Category
