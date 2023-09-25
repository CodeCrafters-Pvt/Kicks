import Card from '../../../components/products/collection/ProductsCard';
import { CardSkeleton } from './CardSkeleton';
import { useGetProductsQuery } from '../../../redux/api/productApiSlice';

const AllProducts = () => {
  const { isLoading, data: products } = useGetProductsQuery();

  return (
    <div className='flex-1'>
      <div className='grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {isLoading ? (
          <CardSkeleton cards={12} />
        ) : (
          products.map((product) => (
            <Card
              key={product._id} // Assuming the product object has an "_id" property
              image={product.image}
              productName={product.productName}
              productCollection={product.productDesc}
              regularPrice={product.regularPrice}
              sellingPrice={product.sellingPrice}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;
