import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai'

const ProductsCard = ({ images, productName, productCollection, regularPrice, sellingPrice }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoverTimeout(
      setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1000) // Adjust the time interval (in milliseconds) between image changes
    );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    clearInterval(hoverTimeout);
    setCurrentImageIndex(0); // Reset to the first image on mouse leave
  };


  return (
    
    <div className="w-full px-2 mb-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="card bg-white rounded-lg shadow-xl p-2 h-[350px] w-[280px]">
        <img src={images[currentImageIndex]} alt={productName} className="w-full h-[200px]  rounded-md mb-4" style={{ maxWidth: '100%' }} />
        <div style={{ display: 'none' }}>
          {/* Render hidden images for hover effect */}
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index}`} style={{ display: 'none' }} />
          ))}
        </div>
        <h1 className="text-l font-semibold mb-1">{productName}</h1> 
        <p className="text-gray-500 mb-3">{productCollection}</p>
        <div>
        <p className="text-gray-500">
          <span className="line-through text-red-500">Rs.{regularPrice}</span> - Rs.{sellingPrice}
        </p>
        
        </div>
        {/* <section className="flex items-center mb-4">
          <AiFillStar className="text-yellow-500" />
          <AiFillStar className="text-yellow-500" />
          <AiFillStar className="text-yellow-500" />
          <AiFillStar className="text-yellow-500" />
          <span className="ml-2">4</span>
        </section> */}

        <div className="flex justify-end">
          <AiOutlineHeart className="mr-2" />
          <AiOutlineShoppingCart />
        </div>
      </div>
    </div>
  );
};

ProductsCard.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  productName: PropTypes.string,
  productCollection: PropTypes.string,
  regularPrice: PropTypes.string,
  sellingPrice: PropTypes.string
};

export default ProductsCard;
