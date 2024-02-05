import { useEffect, useState } from 'react';
import Card from '../../../components/products/collection/ProductsCard';
import axios from 'axios';
import PropTypes from 'prop-types';

const AllProducts = ({ selectedCategory }) => {
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

  const filteredProducts = selectedCategory
    ? (selectedCategory.toLowerCase() === 'all'
      ? products
      : products.filter(({ category }) => category === selectedCategory)
    )
    : products;


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
};

export default AllProducts;
