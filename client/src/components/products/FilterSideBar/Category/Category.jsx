import Input from '../Input'
import PropTypes from 'prop-types';

const Category = ({handleCategoryChange}) => {
  return (
    <>
   <h2 className='text-xl font-normal mb-[20px]'>Category</h2>   
  

   <Input 
   handleChange={handleCategoryChange}
   value="All"
   title = "All"
   name="test"
    />
   <Input 
   handleChange={handleCategoryChange}
   value="Sneaker"
   title = "Sneaker"
   name="test"
    />
    <Input 
   handleChange={handleCategoryChange}
   value="Heels"
   title = "Heels"
   name="test"
    />
      <Input 
   handleChange={handleCategoryChange}
   value="Shoes"
   title = "Shoes"
   name="test"
    />
      <Input 
   handleChange={handleCategoryChange}
   value="Flip flop"
   title = "Flip Flop"
   name="test"
    />
      <Input 
   handleChange={handleCategoryChange}
   value="Flats"
   title = "Flats"
   name="test"
    />
    </>
  )
}

Category.propTypes = {
  handleCategoryChange: PropTypes.func,
}

export default Category
