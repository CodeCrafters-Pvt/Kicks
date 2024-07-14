import { useState } from 'react';
import { FilterPanel, AllProducts } from "../components"


const Product = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
 

  // //Radio Filter
  // const handleChange = event => {
  //   setSelectedCategory(event.target.value)
  // }

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  const handleColorChange = color => {
    // Set the color state
    setSelectedColor(color === selectedColor ? null : color);
  };
  

return (
  <>
    {/* <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} /> */}
    <div className='flex justify-center'>
      {/* Filter container */}
      <div className='w-1/6 pl-8 p-4 '>
        <FilterPanel handleCategoryChange={handleCategoryChange} handleColorChange={handleColorChange} />
      </div>

      {/* Product cards */}
     <AllProducts selectedCategory={selectedCategory} selectedColor={selectedColor} />
    </div>


  </>
);
};

export default Product;
