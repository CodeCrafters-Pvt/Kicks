import PropTypes from 'prop-types'; 

import { useState } from 'react';
import { Input } from '../../components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function Card({
  name,
  type,
  price,
  quantity,
  img,
  favorite,
  isChecked,
}) {
  const [isFavorite, setIsFavorite] = useState(favorite);

  return (
    <div className="bg-white rounded-lg h-36 shadow">
      <Input type="checkbox" field="select" className="mt-1" isChecked={isChecked} />
      <div className="flex mt-3 w-full">
        <img src={img} alt={name} className="w-24 h-20 mx-8 object-contain" />
        <div className="flex flex-col gap-1 my-2 ml-2">
          <span className="font-medium">{name}</span>
          <small className="text-gray-500">{type}</small>
        </div>
        <div className="ml-28 flex gap-16">
          <span className="text-2xl relative top-1">${price}</span>
          <div className="flex flex-col items-center gap-2 relative bottom-5">
            <button className="w-6 bg-gray-400 text-black rounded">-</button>
            <span>{quantity}</span>
            <button className="w-6 bg-primary text-white rounded">+</button>
          </div>
          <div className="flex text-2xl gap-4 relative ml-8 bottom-6 text-gray-700">
            {isFavorite ? (
              <AiFillHeart
                className="cursor-pointer"
                onClick={() => {
                  setIsFavorite(false);
                }}
              />
            ) : (
              <AiOutlineHeart
                className="cursor-pointer"
                onClick={() => {
                  setIsFavorite(true);
                }}
              />
            )}
            <RiDeleteBin6Line className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}


Card.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
};
