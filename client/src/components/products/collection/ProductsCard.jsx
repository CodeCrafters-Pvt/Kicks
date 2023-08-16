import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const ProductsCard = ({ image, productName, productCollection, regularPrice,sellingPrice }) => {
  return (
    <div className="w-full px-2 mb-4">
      <div className="card bg-white rounded-lg shadow-md p-4 h-full">
        {/* Image */}
        <img src={image} alt={productName} className="w-full h-auto rounded-md mb-4" />

        {/* Product Name */}
        <h2 className="text-xl font-bold mb-2">{productName}</h2>

        {/* Product Description */}
        <p className="text-gray-500 mb-4">{productCollection}</p>

        {/* Del Price and Actual Price */}
        <div>
          <del className="text-red-500">{regularPrice}</del>
          <h3 className="text-lg font-semibold text-blue-500">{sellingPrice}</h3>
        </div>

        {/* Star Ratings */}
        <section className="flex items-center mb-4">
          <AiFillStar className="text-yellow-500" />
          <AiFillStar className="text-yellow-500" />
          <AiFillStar className="text-yellow-500" />
          <AiFillStar className="text-yellow-500" />
          <span className="ml-2">4</span>
        </section>

        {/* Icons */}
        <div className="flex justify-end">
          <AiOutlineHeart className="mr-2" />
          <AiOutlineShoppingCart />
        </div>
      </div>
    </div>
  );
};

ProductsCard.propTypes = {
  image: PropTypes.string,
  productName: PropTypes.string,
  productCollection: PropTypes.string,
  regularPrice: PropTypes.string,
  sellingPrice:PropTypes.string
};

export default ProductsCard;
