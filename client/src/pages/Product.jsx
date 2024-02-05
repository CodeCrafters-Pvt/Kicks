import { useEffect, useState } from 'react';
import Card from '../components/products/collection/ProductsCard';
import { FilterPanel, AllProducts } from "../components"
import {useGetProductsQuery} from "../redux/api/productApiSlice"

const Product = () => {
  const {data:products} = useGetProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Radio Filter
  const handleChange = event => {
    setSelectedCategory(event.target.value)
  }

  function FilteredData(products, selected) {
    let filteredProducts = products


    //Selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, colors, brandName, sellingPrice, productName }) =>
          category === selected ||
          colors === selected ||
          sellingPrice === selected ||
          brandName === selected ||
          productName === selected

      )
    }

const result1 = FilteredData(products, selectedCategory) 

    return filteredProducts.map(({productID, images, productName, sellingPrice , regularPrice }) => (
      <Card
       key={productID}
        images={images}
        productName={productName}
        sellingPrice={sellingPrice}
        regularPrice={regularPrice}
 
       />

    ))
  }

  return (
    <>
    
      <div className='flex justify-center'>
        {/* Filter container */}
        <div className='w-1/6 pl-8 p-4 '>
         <FilterPanel handleChange={handleChange} />
        </div>

        {/* Product cards */}
        <AllProducts result={products}/>
      </div>
    </>
  );
};

export default Product;
