import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const ProductsCard = ({ image, title, description, price }) => {
  return (
    <div className="w-full px-2 mb-4">
      <div className="card bg-white rounded-lg shadow-md p-4 h-full">
        {/* Image */}
        <img src={image} alt={title} className="w-full h-auto rounded-md mb-4" />

        {/* Product Name */}
        <h2 className="text-xl font-bold mb-2">{title}</h2>

        {/* Product Description */}
        <p className="text-gray-500 mb-4">{description}</p>

        {/* Del Price and Actual Price */}
        <div>
          <del className="text-red-500">$300</del>
          <h3 className="text-lg font-semibold text-blue-500">{price}</h3>
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
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
};

export default ProductsCard;
