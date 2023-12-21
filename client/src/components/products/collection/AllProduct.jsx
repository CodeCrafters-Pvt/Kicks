import { useEffect, useState } from 'react';
import Card from '../../../components/products/collection/ProductsCard';
import axios from 'axios';
const AllProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:3001/products'); 
            console.log(response.data)
            setProducts(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchProducts();
      }, []);
  return (
    <div className='flex-1'> 
      <div className='grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <Card
            key={product._id} // Assuming the product object has an "_id" property
            image={product.images[0]}
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


  
export default AllProducts;
