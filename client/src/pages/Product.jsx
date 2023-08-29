import { useEffect, useState } from 'react';
import Card from '../components/products/collection/ProductsCard';
import axios from 'axios';
import Filter from '../../../components/products/collection/Filter/';
import Search from '../components/products/collection/Search';
import Type from '../components/products/collection/Type';
const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products'); // Replace with your backend API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Search />
      <div className='flex justify-between items-center p-8'>
        <h1 className='text-2xl pl-12 font-bold mb-4'>All Products</h1>
        <Type />
      </div>

      <div className='flex justify-center'>
        {/* Filter container */}
        <div className='w-1/4 pl-20 p-4 mr-4'>
          <Filter />
        </div>

        {/* Product cards */}
        <div className='flex-1'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.map((product) => (
              <Card
                key={product._id} // Assuming the product object has an "_id" property
                image={product.image}
                title={product.productName}
                description={product.productDesc}
                price={product.productPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
