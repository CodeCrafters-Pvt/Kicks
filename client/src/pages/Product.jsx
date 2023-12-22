import { useEffect, useState } from 'react';
import Card from '../components/products/collection/ProductsCard';
import { Filter, Search, Type, AllProducts } from "../components"
import { useGetProductsQuery } from "../redux/api/productApiSlice"

const Product = () => {
  const { data: products } = useGetProductsQuery();

  return (
    <>

      <div className='flex justify-center'>
        {/* Product cards */}
        <AllProducts result={products} />
      </div>
    </>
  );
};

export default Product;
