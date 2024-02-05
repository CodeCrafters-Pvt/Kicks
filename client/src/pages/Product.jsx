import { useEffect, useState } from 'react';
import Card from '../components/products/collection/ProductsCard';
import { FilterPanel, AllProducts } from "../components"
import { useGetProductsQuery } from "../redux/api/productApiSlice"
import SearchBar from '../components/products/SearchBar/Search';

const Product = () => {
  const { data: products } = useGetProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };


  //Radio Filter
  const handleChange = event => {
    setSelectedCategory(event.target.value)
  }


  // function FilteredData(products, selected) {
  //   if (selected) {
  //     return products.filter(({ category }) => category === selected);
  //   }
  //   return products;
  // }

  // const filteredProducts = FilteredData(products, selectedCategory);


return (
  <>
    {/* <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} /> */}
    <div className='flex justify-center'>
      {/* Filter container */}
      <div className='w-1/6 pl-8 p-4 '>
        <FilterPanel handleChange={handleChange} />
      </div>

      {/* Product cards */}
      <AllProducts selectedCategory={selectedCategory} />
    </div>

    {/* {filteredProducts.map(({ productID, images, productName, sellingPrice, regularPrice }) => (
    <Card
      key={productID}
      images={images}
      productName={productName}
      sellingPrice={sellingPrice}
      regularPrice={regularPrice}

    />

  ))} */}
  </>
);
};

export default Product;
