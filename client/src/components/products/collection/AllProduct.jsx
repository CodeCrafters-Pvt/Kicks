import { useEffect, useState } from 'react';
import Card from '../../../components/products/collection/ProductsCard';
import axios from 'axios';
import PropTypes from 'prop-types';

const AllProducts = ({ selectedCategory,selectedColor }) => {
  const [products, setProducts] = useState([]);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);  // Fetch products only on mount

  const filteredProducts = products.filter(product => {
    // Filter based on category
    if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
      if (product.category !== selectedCategory) return false;
    }
   // Filter based on color
   if (selectedColor && selectedColor.toLowerCase() !== 'all') {
    const colors = product.sizes.colors;
    if (!colors || !Object.keys(colors).length) return false; // No colors available

    // Check if any color matches the selected color
    const colorKeys = Object.keys(colors);
    const matchingColor = colorKeys.some(colorKey => {
      const color = colors[colorKey].color;
      return color && color.toLowerCase() === selectedColor.toLowerCase();
    });
    if (!matchingColor) return false; // No matching color found
  }

  return true;
});
  console.log('Filtered Products:', filteredProducts);


  return (
    <div className='flex-1'>
      <div className='grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 '>
        {filteredProducts.map((product) => (
          <Card
            key={product._id} // Assuming the product object has an "_id" property
            images={product.images}
            productName={product.productName}
            productCollection={product.productDesc}
            regularPrice={product.regularPrice}
            sellingPrice={product.sellingPrice}
          />
        ))}
      </div>
    </div>
  );
};

AllProducts.propTypes = {
  selectedCategory: PropTypes.string,
  selectedColor: PropTypes.string,
};

export default AllProducts;
