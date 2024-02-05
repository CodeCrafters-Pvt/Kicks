import React from 'react'
import PropTypes from 'prop-types';
import Input from '../Input';

const Price = ({handleChange}) => {
 
  return (
    <>
 <h2 className='text-xl font-normal mb-[20px] mt-[20px]'>Price</h2>   
   {/* <label className=' block relative pl-[20px] mb-[12px]'>
    <input type="radio" name="test"/>
    <span></span> All
   </label>

   <label className='block relative pl-[20px] mb-[12px]'>
    <input type="radio" name="test"/>
    <span></span>  $0 - $50
   </label>

   <label className='block relative pl-[20px] mb-[12px]'>
    <input type="radio" name="test"/>
    <span></span> $50 - $100
   </label>

   <label className='block relative pl-[20px] mb-[12px]'>
    <input type="radio" name="test"/>
    <span></span>  $100 - $150
   </label>

   <label className='block relative pl-[20px] mb-[12px]'>
    <input type="radio" name="test"/>
    <span></span>  Over $150
   </label> */}
  {/* <label className=' block relative pl-[20px] mb-[12px]'>
    <input onChange={handleChange} type="radio" name="test2"/>
    <span></span> All
   </label>
 */}

   <Input 
   handleChange={handleChange}
   value="All"
   title = " All"
   name="test2"
    />
<Input 
   handleChange={handleChange}
   value="50"
   title = " $0 - $50"
   name="test2"
    />

<Input 
   handleChange={handleChange}
   value="100"
   title = "$50 - $100"
   name="test2"
    />

<Input 
   handleChange={handleChange}
   value="150"
   title = " $100 - $150"
   name="test2"
    />

<Input 
   handleChange={handleChange}
   value="200"
   title = "Over $150"
   name="test2"
    />
    </>
  )
}

Price.propTypes = {
  handleChange: PropTypes.func,
}

export default Price