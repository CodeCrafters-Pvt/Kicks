import { useEffect, useState } from 'react';
import Card from '../../../components/products/collection/ProductsCard';
import axios from 'axios';
import Filter from '../../../components/products/SideBar/Filter';
import Search from '../../../components/products/collection/Search';
import Type from '../../../components/products/collection/Type';
import AllProducts from '../../../components/products/collection/AllProduct';
const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  //--------input filter----------
  const [query,setQuery] = useState("")

  const handleInputChange = event => {
    setQuery(event.target.value)
  }

  const filteredItems = products.filter(product => product.productName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase() !== -1)
  );

//------------radio filter-----------
const handleChange = event => {
  setSelectedCategory(event.target.value);
}

//------------button filter-----------
const handleClick = event => {
  setSelectedCategory(event.target.value);
}

function filteredData(products, selected, query){
  let filteredProducts = products

  //filtering input items
  if (query) {
    filteredProducts = filteredItems 
  }

  //selected filter

  if(selected) {
    filteredProducts = filteredProducts.filter(
      ({category,color,brandName,productName}) => 
      category === selected || 
      color === selected ||
      brandName===selected|| 
      productName===selected
      )
  }

  return filteredProducts.map(({id,productName})=>
  <Card
  key={id} // Assuming the product object has an "_id" property
  title={productName}

/>
  )
}

const result= filteredData(products,selectedCategory,query);

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
      <Search query={query} handleInputChange={handleInputChange}/>
      <div className='flex justify-between items-center p-8'>
        <h1 className='text-2xl pl-12 font-bold mb-4'>All Products</h1>
        <Type handleClick={handleClick} />
      </div>

      <div className='flex justify-center'>
        {/* Filter container */}
        <div className='w-1/4 pl-20 p-4 mr-4'>
          <Filter handleChange={handleChange} />
        </div>

        {/* Product cards */}
       <AllProducts result={result} />
      </div>
    </>
  );
};

export default Product;
